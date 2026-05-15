# Clean Code 精华系列：写出让人眼前一亮的代码

> "花时间保持代码整洁，远比浪费时间后期维护糟糕代码要值得。" — Robert C. Martin

## 什么是 Clean Code？

**Clean Code**（整洁代码）是由 Robert C. Martin 提出的软件工程核心理念，强调代码不仅要能运行，更要**人类可读、可维护、可扩展**。

---

## 核心原则

### 1. 命名原则

**好命名 > 注释解释**

```python
# ❌ 差
d = 86400  # 秒
def proc(a, b):
    if a > 5:
        return b

# ✅ 好
SECONDS_PER_DAY = 86400
def process_order(order, discount):
    if order.total_amount > MINIMUM_ORDER_THRESHOLD:
        return apply_discount(order, discount)
```

**命名规范：**
- 变量名要**见名知意**
- 类名 → 名词或名词短语（UserService, OrderProcessor）
- 方法名 → 动词或动词短语（calculateTotal, saveUser）
- 常量 → 全大写下划线分隔（MAX_RETRY_COUNT）

---

### 2. 函数原则

**短小精悍，一个函数只做一件事**

```python
# ❌ 差：一个函数做三件事
def handle_userregistration(user_data):
    # 验证
    if not user_data.get('email'):
        return False
    if not user_data.get('password'):
        return False
    # 保存
    user = User.objects.create(...)
    # 发送邮件
    send_welcome_email(user.email)
    return user

# ✅ 好：职责分离
def validate_registration_data(user_data):
    required_fields = ['email', 'password']
    for field in required_fields:
        if not user_data.get(field):
            raise ValidationError(f"Missing field: {field}")

def create_user(user_data):
    return User.objects.create(**user_data)

def send_welcome_email(user):
    EmailService.send(user.email, template='welcome')
```

**函数黄金法则：**
- 行数 < 20行
- 嵌套层级 < 3层
- 参数数量 ≤ 3个
- 只做一件事

---

### 3. 注释原则

**注释是代码的补救，不是代码的替代品**

```python
# ❌ 差：废话注释
# 循环遍历用户列表
for user in users:
    process(user)

# ✅ 好：解释"为什么"，不是"是什么"
# 只有VIP用户需要额外验证，普通用户直接通过
if user.is_vip and user.auth_level < 2:
    perform_additional_verification(user)
```

**好的注释类型：**
- 法律注释（版权声明）
- 解释复杂业务逻辑
- TODO 说明
- 警告注释

---

### 4. 错误处理原则

```python
# ❌ 差：返回 null 或空值
def find_user(user_id):
    user = User.objects.get(id=user_id)
    if not user:
        return None  # 让调用者处理空指针

# ✅ 好：明确语义，让调用者知道发生了什么
def find_user(user_id):
    try:
        return User.objects.get(id=user_id)
    except User.DoesNotExist:
        raise UserNotFoundError(f"User {user_id} not found")
```

---

## Clean Code 实践清单

| 类别 | 检查项 |
|------|--------|
| 命名 | 变量/函数/类名是否清晰表达意图？ |
| 函数 | 是否小于20行？是否只做一件事？ |
| 注释 | 注释是否解释"为什么"而非"是什么"？ |
| 格式 | 代码风格是否一致？ |
| 错误 | 错误处理是否优雅？ |

---

## 系列预告

1. **Clean Code 精华系列** — 写代码的艺术 ✅
2. **设计模式实战系列** — GoF 23种模式精讲
3. **The Pragmatic Programmer** — 程序员的思维方式
4. **DDIA 分布式系统** — 数据密集型系统设计
5. **Clean Architecture** — 架构整洁之道

---

*保持学习，保持代码整洁。下一篇文章：《设计模式实战：为什么你需要策略模式？》*