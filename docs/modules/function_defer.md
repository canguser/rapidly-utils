[@rapidly/utils](../README.md) / [Modules](../modules.md) / function/defer

# Module: function/defer

## Table of contents

### Functions

- [defer](function_defer.md#defer)

## Functions

### defer

▸ **defer**<`T`\>(`_self`, ...`args`): `Promise`<`T`\>

推迟调用，直到当前堆栈清理完毕。调用时，任何附加的参数会传给函数。

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `_self` | (...`args`: `any`) => `T` | 要延迟的函数 |
| `...args` | `any`[] | 会在调用时传给函数的参数 |

#### Returns

`Promise`<`T`\>

#### Defined in

[function/defer.ts:6](https://github.com/canguser/rapidly-utils/blob/af8066a/main/function/defer.ts#L6)
