# Claude Code 源码架构详细分析

> 来源: https://github.com/heidsoft/claude-code  
> 分析日期: 2026-04-01  
> 规模: ~1900 文件, 512,000+ 行 TypeScript

---

## 一、整体架构图

```
┌─────────────────────────────────────────────────────────────┐
│                      main.tsx (入口)                        │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ commands.ts │  │  tools.ts   │  │  QueryEngine.ts    │  │
│  │  (50+命令)  │  │  (40+工具)  │  │    (核心循环)      │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│                      services/ (服务层)                      │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────────────────┐   │
│  │ API  │ │ MCP  │ │分析  │ │插件  │ │ Context压缩      │   │
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│                    React + Ink (终端UI)                      │
└─────────────────────────────────────────────────────────────┘
```

---

## 二、核心模块详解

### 1. 入口模块 (main.tsx)

**职责**: CLI 入口、启动初始化、命令路由

**关键特性**:
```typescript
// 启动性能优化：并行执行
profileCheckpoint('main_tsx_entry');     // 性能埋点
startMdmRawRead();                        // 并行读取 MDM 配置
startKeychainPrefetch();                  // 并行读取 keychain (OAuth + API Key)
```

**优化效果**: MDM + Keychain 并行，节省 ~200ms 启动时间

**核心流程**:
1. 解析命令行参数 (Commander.js)
2. 初始化遥测 (Telemetry)
3. 加载配置和插件
4. 路由到对应命令或进入 REPL 交互模式

---

### 2. 命令系统 (commands.ts)

**职责**: 注册和管理所有 slash 命令

**命令数量**: ~50+ 个

**注册方式**:
```typescript
// 直接导入
import commit from './commands/commit.js'
import doctor from './commands/doctor/index.js'

// 条件导入 (feature flag)
const voiceCommand = feature('VOICE_MODE')
  ? require('./commands/voice/index.js').default
  : null
```

**命令分类**:

| 分类 | 命令 | 说明 |
|---|---|---|
| **Git** | `/commit`, `/diff`, `/branch` | Git 操作 |
| **调试** | `/doctor`, `/review`, `/test` | 诊断和审查 |
| **上下文** | `/context`, `/compact`, `/memory` | 上下文管理 |
| **会话** | `/resume`, `/share`, `/teleport` | 会话管理 |
| **任务** | `/tasks`, `/plan` | 任务管理 |
| **配置** | `/config`, `/theme`, `/mcp` | 配置管理 |
| **Agent** | `/agents`, `/skills` | Agent 和技能 |

**关键文件**:
- `src/commands.ts` - 命令注册中心
- `src/commands/commit.ts` - Git 提交
- `src/commands/doctor/index.ts` - 环境诊断
- `src/commands/mcp/index.ts` - MCP 服务器管理

---

### 3. 工具系统 (tools.ts)

**职责**: 定义 Agent 可调用的工具能力

**工具数量**: ~40+ 个

**核心工具**:

```typescript
// 文件操作
BashTool        // Shell 命令执行
FileReadTool    // 文件读取 (支持图片、PDF、Notebook)
FileWriteTool   // 文件创建/覆盖
FileEditTool    // 文件修改 (字符串替换)
GlobTool        // 文件模式匹配
GrepTool        // 内容搜索 (ripgrep)

// 网络
WebFetchTool    // 获取 URL 内容
WebSearchTool   // Web 搜索

// 任务与Agent
AgentTool       // 子 Agent  spawn
TaskCreateTool  // 任务创建
TaskUpdateTool  // 任务更新

// 高级
LSPTool         // Language Server Protocol
McpTool         // MCP 服务器工具
```

**工具注册模式**:
```typescript
export const getTools = (): Tools => ({
  Bash: new BashTool(),
  Read: new FileReadTool(),
  Write: new FileWriteTool(),
  Edit: new FileEditTool(),
  Glob: new GlobTool(),
  Grep: new GrepTool(),
  // ...
})
```

**工具接口规范** (Tool.ts):
```typescript
interface Tool {
  name: string;
  description: string;
  inputSchema: zod.ZodSchema;
  execute(input: unknown): Promise<ToolResult>;
}
```

---

### 4. 查询引擎 (QueryEngine.ts)

**职责**: 核心交互循环 - 处理用户输入、调用 LLM、执行工具

**核心流程**:

```
用户输入 → 构建 Context → Anthropic API → 解析 Tool Use → 执行工具 → 循环
```

**关键代码结构**:
```typescript
class QueryEngine {
  async query(userInput: string) {
    // 1. 收集上下文
    const context = await this.collectContext(userInput);
    
    // 2. 调用 Anthropic API
    const response = await anthropic.messages.create({
      model: getMainLoopModel(),
      messages: context,
      tools: getToolsSchema()
    });
    
    // 3. 解析并执行工具调用
    for (const toolCall of response.tool_calls) {
      await this.executeTool(toolCall);
    }
    
    // 4. 循环直到完成
    if (response.stop_reason === 'tool_use') {
      await this.query(continuePrompt);
    }
  }
}
```

**上下文构建**:
- System Prompt (系统提示词)
- 用户上下文 (当前目录、项目结构)
- 对话历史
- 工具执行结果

---

### 5. 服务层 (services/)

**职责**: 外部集成和能力抽象

#### 5.1 API 服务 (`services/api/`)
- `bootstrap.ts` - 初始化引导数据
- `filesApi.ts` - 文件上传/下载
- `claude.ts` - Anthropic API 封装

#### 5.2 MCP 服务 (`services/mcp/`)
- Model Context Protocol 客户端
- 官方 MCP 服务器注册表
- 工具和资源发现

#### 5.3 分析服务 (`services/analytics/`)
- GrowthBook 特性开关
- 使用量统计
- 事件追踪

#### 5.4 插件系统 (`services/plugins/`)
- 插件加载器
- 内置插件初始化
- 插件 CLI 命令

#### 5.5 上下文压缩 (`services/compact/`)
- 对话上下文压缩
- Token 成本追踪

---

### 6. 状态管理 (state/)

**职责**: 应用状态管理

```typescript
// AppState.tsx - 主状态
interface AppState {
  session: SessionState;
  context: ContextState;
  tools: ToolsState;
  ui: UIState;
}
```

---

### 7. 终端 UI (React + Ink)

**职责**: 终端图形界面渲染

**技术栈**:
- React 组件
- Ink (终端 UI 框架)
- chalk (颜色输出)

**组件示例**:
```typescript
import { render } from 'ink';
import React from 'react';

const App = () => (
  <Box>
    <Text color="green">Hello</Text>
    <Text color="red">World</Text>
  </Box>
);

render(<App />);
```

---

## 三、关键技术特性

### 1. 启动性能优化

```typescript
// 并行执行耗时操作
startMdmRawRead();       // MDM 配置读取
startKeychainPrefetch(); // Keychain 预取
```

**效果**: 节省 ~200ms 启动时间

---

### 2. Feature Flag 机制

```typescript
import { feature } from 'bun:bundle';

// 条件编译，tree-shaking 移除未启用代码
const voiceCommand = feature('VOICE_MODE')
  ? require('./commands/voice/index.js').default
  : null
```

**支持的特性**:
- `VOICE_MODE` - 语音输入
- `KAIROS` - 高级模式
- `BUDDY` - 伙伴模式
- `BRIDGE_MODE` - 桥接模式
- `COORDINATOR_MODE` - 协调器模式

---

### 3. Lazy Import 打破循环依赖

```typescript
// 延迟加载
const getTeammateUtils = () => require('./utils/teammate.js');
```

---

### 4. MCP (Model Context Protocol)

支持扩展 Agent 能力：
```typescript
// MCP 工具调用
const mcpTools = await getMcpTools();
// 动态发现和执行
```

---

## 四、目录结构总览

```
src/
├── main.tsx                 # 入口
├── commands.ts              # 命令注册
├── tools.ts                 # 工具注册
├── QueryEngine.ts           # 核心循环
├── context.ts               # 上下文收集
├── cost-tracker.ts          # 成本追踪
│
├── commands/                # ~50 个命令实现
│   ├── commit/              # Git 提交
│   ├── doctor/              # 诊断
│   ├── mcp/                 # MCP 管理
│   └── ...
│
├── tools/                   # ~40 个工具实现
│   ├── BashTool/            # Shell 执行
│   ├── FileReadTool/        # 文件读取
│   ├── AgentTool/           # 子 Agent
│   └── ...
│
├── services/                # 服务层
│   ├── api/                 # API 客户端
│   ├── mcp/                 # MCP 协议
│   ├── analytics/           # 分析
│   └── plugins/             # 插件
│
├── components/              # Ink UI 组件 (~140)
├── hooks/                   # React Hooks
├── state/                   # 状态管理
├── utils/                   # 工具函数
│
├── bridge/                  # IDE 桥接
├── coordinator/              # 多 Agent 协调
├── plugins/                 # 插件系统
├── skills/                  # 技能系统
└── memdir/                  # 持久化内存
```

---

## 五、与 OpenClaw 对比

| 特性 | Claude Code | OpenClaw |
|---|---|---|
| 运行时 | Bun | Node.js |
| UI 框架 | React + Ink | Terminal UI |
| 工具系统 | ~40 个 | 可扩展 |
| 命令系统 | ~50 个 | 可扩展 |
| 插件系统 | 支持 | 支持 |
| 技能系统 | 支持 | 支持 |
| MCP | 支持 | 支持 |

---

## 六、学习价值

1. **大规模 CLI 设计**: 如何组织 50+ 命令和 40+ 工具
2. **性能优化**: 启动并行化、条件编译
3. **架构模式**: 插件系统、技能系统、MCP 集成
4. **工程实践**: Feature flag、Tree-shaking、Lazy load

---

*文档生成于 2026-04-01*