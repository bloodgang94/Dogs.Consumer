import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import HelloWorld from '../HelloWorld.vue'

// describe 是用來定義一個測試的關鍵字，it 則是用來具體定義我們要測試的行為。
// mount 是 Vue Test Utils 提供的函數，用於掛載 Vue 組件並返回一個包裝器（wrapper），
// 其第一個參數是要掛載的 Vue 組件（HelloWorld），第二個參數是掛載選項，在這裡，我們傳遞了一個 props 對象，用來設置組件的道具（props）。
describe('HelloWorld', () => {
  it('renders properly', () => {
    // mount 是 @vue/test-utils 提供的函數，用於創建 Vue 組件的實例並掛載到 DOM 中，以便進行測試。
    // HelloWorld 是要被測試的 Vue 組件。
    // 第二個參數 { props: { msg: 'Hello Vitest' } } 是傳遞給組件的屬性（props）。在這個例子中，我們給 HelloWorld 組件傳遞了一個 msg 屬性，其值為 'Hello Vitest'。
    const wrapper = mount(HelloWorld, { props: { msg: 'Hello Vitest' } })
    // expect 是用來設置斷言的。這裡用來檢查測試結果是否符合預期。
    // wrapper.text() 是用來獲取組件的渲染文本。
    // toContain 是一個斷言方法，用於檢查某個值是否包含特定的文本。這裡我們檢查組件渲染的文本是否包含 'Hello Vitest'。
    expect(wrapper.text()).toContain('Hello Vitest')
  })
  it('測試組件內函式', () => {
    const wrapper = mount(HelloWorld)
    const vm = wrapper.vm
    expect(vm.greet(1, 2)).toBe(3)
  })
  it('awitfn', async () => {
    const wrapper = mount(HelloWorld)
    const vm = wrapper.vm
    await vm.handleClick()
    // 等待 `message` 改變
    await wrapper.vm.$nextTick() // 等待 DOM 更新
    expect(wrapper.text()).toContain('Async operation complete')
  })
  it('should handle async operations correctly', async () => {
    const wrapper = mount(HelloWorld)

    // 觸發非同步事件
    await wrapper.find('#primary-button').trigger('click')

    // 等待異步操作完成
    // 因是觸發按鈕，按鈕本身不是非同步事件，所以必須自定義非同步事件，才能測試
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // 等待 `message` 改變
    await wrapper.vm.$nextTick() // 等待 DOM 更新

    // 檢查結果
    expect(wrapper.text()).toContain('Async operation complete')
  })
})

// wrapper
// wrapper 是由 @vue/test-utils 提供的 mount 函數返回的對象。
// 它是一個封裝了 Vue 組件實例的包裝器（wrapper），提供了對組件進行操作和斷言的 API。
// 你可以使用 wrapper 來：
// 獲取組件的 DOM 結構（wrapper.html()）。
// 查找組件內部的元素（wrapper.find()）。
// 獲取組件的渲染文本（wrapper.text()）。
// 模擬用戶交互（wrapper.trigger()）等。

// vm
// vm 是 wrapper.vm 返回的 Vue 組件實例。
// vm 代表 Vue 組件的實例，你可以通過它直接訪問組件的數據、方法和計算屬性。
// 你可以使用 vm 來：
// 調用組件內部的方法（vm.someMethod()）。
// 訪問組件的數據屬性（vm.someData）。
// 確認計算屬性的值（vm.computedProperty）等。

// async 和 await：最常見的處理非同步測試的方式，讓測試代碼更具可讀性。
// nextTick：等待 Vue 更新 DOM，確保非同步操作完成。
