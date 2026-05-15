# 设计模式实战系列：为什么你需要策略模式？

> "设计模式是针对特定上下文中常见问题的通用可重用解决方案。" — Erich Gamma

## 为什么需要设计模式？

想象一下这样的场景：

```
电商系统需要支持多种支付方式：
- 支付宝
- 微信支付
- 银行卡支付
- PayPal

你会怎么写？
```

---

## ❌ 方案一：if-else 地狱

```python
def process_payment(order, payment_type):
    if payment_type == 'alipay':
        # 支付宝逻辑
        if order.amount > 10000:
            return AlipayGateway.safe_pay(order)
        else:
            return AlipayGateway.fast_pay(order)
    elif payment_type == 'wechat':
        # 微信支付逻辑
        if order.currency == 'CNY':
            return WechatGateway.pay_cny(order)
        else:
            return WechatGateway.pay_foreign(order)
    elif payment_type == 'card':
        # 银行卡逻辑
        return CardGateway.charge(order)
    elif payment_type == 'paypal':
        # PayPal逻辑
        return PaypalGateway.process(order)
    # ... 更多支付方式
```

**问题：**
- 代码臃肿，难以维护
- 新增支付方式需要修改核心逻辑
- 违反开闭原则（对扩展开放，对修改封闭）
- 难以单独测试每种支付逻辑

---

## ✅ 方案二：策略模式

### 核心思想

**把每种支付算法封装成独立的对象，让它们可以互相替换。**

```
         ┌─────────────────┐
         │   PaymentContext│
         │─────────────────│
         │ + set_strategy()│
         │ + execute()     │
         └────────┬────────┘
                  │
                  ▼
         ┌─────────────────┐
         │  PaymentStrategy│
         │      (接口)      │
         │─────────────────│
         │ + pay(order)     │
         └────────┬────────┘
                  │
    ┌─────────────┼─────────────┐
    │             │             │
    ▼             ▼             ▼
┌───────┐   ┌─────────┐   ┌──────────┐
│ Alipay │   │ Wechat  │   │  PayPal  │
│Strategy│   │ Strategy│   │  Strategy│
└───────┘   └─────────┘   └──────────┘
```

### 实现代码

```python
from abc import ABC, abstractmethod
from decimal import Decimal

# 策略接口
class PaymentStrategy(ABC):
    @abstractmethod
    def pay(self, order: 'Order') -> PaymentResult:
        pass

    @abstractmethod
    def refund(self, order: 'Order') -> RefundResult:
        pass

# 具体策略实现
class AlipayStrategy(PaymentStrategy):
    def __init__(self, partner_id: str, partner_key: str):
        self.partner_id = partner_id
        self.partner_key = partner_key

    def pay(self, order):
        if order.amount > Decimal('10000'):
            return self._safe_pay(order)
        return self._fast_pay(order)

    def refund(self, order):
        return AlipayGateway.refund(order.trade_no)

    def _safe_pay(self, order):
        # 安全支付逻辑（大额）
        pass

    def _fast_pay(self, order):
        # 快速支付逻辑（小额）
        pass

class WechatPayStrategy(PaymentStrategy):
    def pay(self, order):
        if order.currency == 'CNY':
            return self._pay_cny(order)
        return self._pay_foreign(order)

    def refund(self, order):
        return WechatGateway.refund(order.transaction_id)

class PayPalStrategy(PaymentStrategy):
    def pay(self, order):
        return PayPalGateway.process(order)

    def refund(self, order):
        return PayPalGateway.refund(order.paypal_ref)

# 上下文类
class PaymentContext:
    def __init__(self, strategy: PaymentStrategy):
        self._strategy = strategy

    def set_strategy(self, strategy: PaymentStrategy):
        """运行时切换策略"""
        self._strategy = strategy

    def execute_payment(self, order):
        return self._strategy.pay(order)

    def execute_refund(self, order):
        return self._strategy.refund(order)

# 客户端代码
class OrderService:
    def __init__(self):
        self._payment_context = None

    def set_payment_method(self, payment_type: str):
        strategies = {
            'alipay': lambda: AlipayStrategy(PARTNER_ID, PARTNER_KEY),
            'wechat': WechatPayStrategy,
            'paypal': PayPalStrategy,
        }
        self._payment_context = PaymentContext(strategies[payment_type]())

    def checkout(self, order):
        return self._payment_context.execute_payment(order)
```

### 使用示例

```python
# 用户选择支付宝
order_service.set_payment_method('alipay')
result = order_service.checkout(order)

# 后期切换为微信支付，无需修改OrderService
order_service.set_payment_method('wechat')
result = order_service.checkout(order)
```

---

## 策略模式的优势

| 维度 | if-else 方案 | 策略模式 |
|------|-------------|----------|
| **可维护性** | 差（逻辑分散） | 好（各策略独立） |
| **可扩展性** | 差（需改核心代码） | 好（新增策略类即可） |
| **可测试性** | 差（难以单独测试） | 好（每个策略可独立测试） |
| **运行时切换** | 不支持 | 支持 |
| **代码复用** | 低（重复代码） | 高（公共接口抽象） |

---

## 策略模式的适用场景

✅ **当存在多种算法/行为，且需要运行时切换时**
- 支付方式
- 排序算法
- 压缩算法
- 验证规则
- 促销计算规则

❌ **当只有2-3种简单场景时**
- if-else 可能更简洁
- 过度设计的代价更大

---

## 常见误区

```python
# ❌ 过度使用策略模式
# 场景：只有两种状态，开和关
class OnOffStrategy:
    pass

class SwitchContext:
    pass
# 简单 if (status) 更合适

# ✅ 正确评估
# 支付方式 > 3种，且可能扩展 → 策略模式
# 只有两种简单状态 → if-else 更简洁
```

---

## 系列预告

1. **Clean Code 精华系列** ✅
2. **策略模式** ✅
3. **工厂模式** — 对象如何创建？
4. **单例模式** — 全局唯一对象
5. **观察者模式** — 事件监听系统
6. **装饰器模式** — 动态增强功能

---

*保持学习，下一篇：《工厂模式：对象创建的智慧》*