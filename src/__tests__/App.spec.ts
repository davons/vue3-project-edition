import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'

// Mock router
const mockRouter = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: { template: '<div>Home</div>' },
    },
    {
      path: '/projects',
      component: { template: '<div>Projects</div>' },
    },
  ],
})

describe('App.vue', () => {
  let wrapper: any

  beforeEach(() => {
    // Mock the Auth component to simplify testing
    wrapper = mount(App, {
      global: {
        plugins: [mockRouter],
        stubs: {
          Auth: {
            name: 'Auth',
            template: '<div class="auth-wrapper"><slot /></div>',
          },
        },
      },
    })
  })

  it('renders the App component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('renders Auth component', () => {
    expect(wrapper.findComponent({ name: 'Auth' }).exists()).toBe(true)
  })

  it('has correct component name', () => {
    expect(wrapper.vm.$options.name).toBe('App')
  })

  it('renders without errors', () => {
    expect(wrapper.vm).toBeDefined()
  })
})
