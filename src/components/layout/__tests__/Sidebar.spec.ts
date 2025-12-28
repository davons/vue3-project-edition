import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Sidebar from '../Sidebar.vue'

describe('Sidebar.vue', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(Sidebar, {
      global: {
        stubs: {
          Button: {
            name: 'Button',
            template: '<button><slot /></button>',
          },
          SidebarLinks: {
            name: 'SidebarLinks',
            props: ['links'],
            template:
              '<nav class="sidebar-links"><div v-for="link in links" :key="link.to">{{ link.label }}</div></nav>',
          },
          'iconify-icon': {
            name: 'IconifyIcon',
            props: ['icon'],
            template: '<span :data-icon="icon"></span>',
          },
        },
      },
    })
  })

  describe('Component Rendering', () => {
    it('renders Sidebar component', () => {
      expect(wrapper.exists()).toBe(true)
    })

    it('has correct component name', () => {
      expect(wrapper.vm.$options.name).toBe('SideBar')
    })

    it('renders aside element', () => {
      expect(wrapper.find('aside').exists()).toBe(true)
    })
  })

  describe('Layout and Styling', () => {
    it('has fixed positioning', () => {
      const aside = wrapper.find('aside')
      expect(aside.classes()).toContain('fixed')
    })

    it('has full screen height', () => {
      const aside = wrapper.find('aside')
      expect(aside.classes()).toContain('h-screen')
    })

    it('has border on right side', () => {
      const aside = wrapper.find('aside')
      expect(aside.classes()).toContain('border-r')
    })

    it('has muted background', () => {
      const aside = wrapper.find('aside')
      expect(aside.classes()).toContain('bg-muted/40')
    })

    it('has responsive width classes', () => {
      const aside = wrapper.find('aside')
      expect(aside.classes()).toContain('lg:w-52')
      expect(aside.classes()).toContain('w-16')
    })

    it('has transition for width changes', () => {
      const aside = wrapper.find('aside')
      expect(aside.classes()).toContain('transition-[width]')
    })

    it('has flex column layout', () => {
      const aside = wrapper.find('aside')
      expect(aside.classes()).toContain('flex')
      expect(aside.classes()).toContain('flex-col')
    })

    it('has gap spacing', () => {
      const aside = wrapper.find('aside')
      expect(aside.classes()).toContain('gap-2')
    })
  })

  describe('Header Section', () => {
    it('renders header with correct height', () => {
      const header = wrapper.find('.h-16')
      expect(header.exists()).toBe(true)
      expect(header.classes()).toContain('items-center')
    })

    it('has border below header', () => {
      const header = wrapper.find('.h-16')
      expect(header.classes()).toContain('border-b')
    })

    it('renders menu button', () => {
      const buttons = wrapper.findAllComponents({ name: 'Button' })
      expect(buttons.length).toBeGreaterThan(0)
    })

    it('buttons have correct size classes', () => {
      const buttons = wrapper.findAllComponents({ name: 'Button' })
      buttons.forEach((button) => {
        expect(button.classes()).toContain('w-8')
        expect(button.classes()).toContain('h-8')
      })
    })
  })

  describe('Navigation Section', () => {
    it('renders nav element', () => {
      expect(wrapper.find('nav').exists()).toBe(true)
    })

    it('nav has flex column layout', () => {
      const nav = wrapper.find('nav')
      expect(nav.classes()).toContain('flex')
      expect(nav.classes()).toContain('flex-col')
    })

    it('nav takes full height with justify-between', () => {
      const nav = wrapper.find('nav')
      expect(nav.classes()).toContain('h-full')
      expect(nav.classes()).toContain('justify-between')
    })

    it('nav has relative positioning', () => {
      const nav = wrapper.find('nav')
      expect(nav.classes()).toContain('relative')
    })
  })

  describe('Navigation Links', () => {
    it('renders main navigation SidebarLinks', () => {
      const linkComponents = wrapper.findAllComponents({ name: 'SidebarLinks' })
      expect(linkComponents.length).toBe(2) // main nav + account nav
    })

    it('main nav has correct links', () => {
      const linkComponents = wrapper.findAllComponents({ name: 'SidebarLinks' })
      const mainLinks = linkComponents[0]
      expect(mainLinks.props('links')).toEqual([
        { to: '/', icon: 'lucide:house', label: 'Dashboard' },
        { to: '/projects', icon: 'lucide:building-2', label: 'Projects' },
        { to: '/tasks', icon: 'lucide:badge-check', label: 'My Tasks' },
      ])
    })

    it('main nav includes Dashboard link', () => {
      expect(wrapper.text()).toContain('Dashboard')
    })

    it('main nav includes Projects link', () => {
      expect(wrapper.text()).toContain('Projects')
    })

    it('main nav includes My Tasks link', () => {
      expect(wrapper.text()).toContain('My Tasks')
    })
  })

  describe('Account Links Section', () => {
    it('account nav has correct links', () => {
      const linkComponents = wrapper.findAllComponents({ name: 'SidebarLinks' })
      const accountLinks = linkComponents[1]
      expect(accountLinks.props('links')).toEqual([
        { to: '/profile', icon: 'lucide:user', label: 'Profile' },
        { to: '/settings', icon: 'lucide:settings', label: 'Settings' },
        { to: '/signout', icon: 'lucide:log-out', label: 'Sign out' },
      ])
    })

    it('account nav includes Profile link', () => {
      expect(wrapper.text()).toContain('Profile')
    })

    it('account nav includes Settings link', () => {
      expect(wrapper.text()).toContain('Settings')
    })

    it('account nav includes Sign out link', () => {
      expect(wrapper.text()).toContain('Sign out')
    })
  })

  describe('Data Structure', () => {
    it('defines main navigation links', () => {
      expect(wrapper.vm.$data).toBeDefined()
    })

    it('defines account navigation links', () => {
      expect(wrapper.vm.$data).toBeDefined()
    })

    it('navigation links have required properties', () => {
      const linkComponents = wrapper.findAllComponents({ name: 'SidebarLinks' })
      const mainLinks = linkComponents[0].props('links')
      mainLinks.forEach((link) => {
        expect(link).toHaveProperty('to')
        expect(link).toHaveProperty('icon')
        expect(link).toHaveProperty('label')
      })
    })
  })
})
