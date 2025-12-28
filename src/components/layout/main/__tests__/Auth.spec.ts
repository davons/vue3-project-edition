import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Auth from '../Auth.vue'

describe('Auth.vue', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(Auth, {
      global: {
        stubs: {
          Sidebar: {
            name: 'Sidebar',
            template: '<aside class="sidebar"><div class="sidebar-content">Sidebar</div></aside>',
          },
          TopNavbar: {
            name: 'TopNavbar',
            template: '<nav class="navbar"><div>TopNavbar</div></nav>',
          },
        },
      },
    })
  })

  describe('Component Rendering', () => {
    it('renders Auth component', () => {
      expect(wrapper.exists()).toBe(true)
    })

    it('renders Sidebar component', () => {
      expect(wrapper.findComponent({ name: 'Sidebar' }).exists()).toBe(true)
    })

    it('renders TopNavbar component', () => {
      expect(wrapper.findComponent({ name: 'TopNavbar' }).exists()).toBe(true)
    })
  })

  describe('Layout Structure', () => {
    it('has correct flex layout structure', () => {
      const mainDiv = wrapper.find('div.flex.flex-col')
      expect(mainDiv.exists()).toBe(true)
    })

    it('has responsive margin classes', () => {
      const mainDiv = wrapper.find('div.flex.flex-col')
      expect(mainDiv.classes()).toContain('lg:ml-52')
      expect(mainDiv.classes()).toContain('ml-16')
    })

    it('has transition class for smooth margin changes', () => {
      const mainDiv = wrapper.find('div.flex.flex-col')
      expect(mainDiv.classes()).toContain('transition-[margin]')
    })
  })

  describe('Main Content Area', () => {
    it('renders main element with correct classes', () => {
      const mainElement = wrapper.find('main')
      expect(mainElement.exists()).toBe(true)
      expect(mainElement.classes()).toContain('flex-1')
      expect(mainElement.classes()).toContain('p-4')
    })

    it('displays page title', () => {
      expect(wrapper.text()).toContain('Page Title')
    })

    it('has correct spacing classes on main element', () => {
      const mainElement = wrapper.find('main')
      expect(mainElement.classes()).toContain('gap-4')
      expect(mainElement.classes()).toContain('lg:gap-6')
      expect(mainElement.classes()).toContain('lg:p-6')
    })
  })

  describe('Page Title Header', () => {
    it('renders header with flex layout', () => {
      const header = wrapper.find('.flex.items-center')
      expect(header.exists()).toBe(true)
    })

    it('displays h1 with correct text', () => {
      const heading = wrapper.find('h1')
      expect(heading.exists()).toBe(true)
      expect(heading.text()).toBe('Page Title')
    })

    it('h1 has responsive font size classes', () => {
      const heading = wrapper.find('h1')
      expect(heading.classes()).toContain('text-lg')
      expect(heading.classes()).toContain('font-semibold')
      expect(heading.classes()).toContain('md:text-2xl')
    })
  })

  describe('Component Structure', () => {
    it('renders Sidebar before main flex container', () => {
      const html = wrapper.html()
      const sidebarIndex = html.indexOf('sidebar')
      const mainIndex = html.indexOf('flex-col')
      expect(sidebarIndex).toBeLessThan(mainIndex)
    })

    it('renders TopNavbar inside flex container', () => {
      const mainDiv = wrapper.find('div.flex.flex-col')
      expect(mainDiv.findComponent({ name: 'TopNavbar' }).exists()).toBe(true)
    })

    it('renders main element after TopNavbar', () => {
      const mainDiv = wrapper.find('div.flex.flex-col')
      const topnavbar = mainDiv.findComponent({ name: 'TopNavbar' })
      const main = mainDiv.find('main')
      expect(topnavbar.exists()).toBe(true)
      expect(main.exists()).toBe(true)
    })
  })
})
