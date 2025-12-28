import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import TopNavbar from '../TopNavbar.vue'

describe('TopNavbar.vue', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(TopNavbar, {
      global: {
        stubs: {
          Input: {
            name: 'Input',
            props: ['type', 'placeholder'],
            template: '<input :type="type" :placeholder="placeholder" class="input" />',
          },
          DropdownMenu: {
            name: 'DropdownMenu',
            template: '<div class="dropdown-menu"><slot /></div>',
          },
          DropdownMenuTrigger: {
            name: 'DropdownMenuTrigger',
            template: '<button class="dropdown-trigger"><slot /></button>',
          },
          DropdownMenuContent: {
            name: 'DropdownMenuContent',
            template: '<div class="dropdown-content"><slot /></div>',
          },
          DropdownMenuLabel: {
            name: 'DropdownMenuLabel',
            template: '<div class="dropdown-label"><slot /></div>',
          },
          DropdownMenuSeparator: {
            name: 'DropdownMenuSeparator',
            template: '<hr class="dropdown-separator" />',
          },
          DropdownMenuItem: {
            name: 'DropdownMenuItem',
            template: '<button class="dropdown-item"><slot /></button>',
          },
          Avatar: {
            name: 'Avatar',
            template: '<div class="avatar"><slot /></div>',
          },
          AvatarImage: {
            name: 'AvatarImage',
            props: ['src'],
            template: '<img :src="src" class="avatar-image" />',
          },
          AvatarFallback: {
            name: 'AvatarFallback',
            template: '<span class="avatar-fallback"><slot /></span>',
          },
          'iconify-icon': {
            name: 'IconifyIcon',
            props: ['icon'],
            template: '<span :data-icon="icon" class="icon"></span>',
          },
        },
      },
    })
  })

  describe('Component Rendering', () => {
    it('renders TopNavbar component', () => {
      expect(wrapper.exists()).toBe(true)
    })

    it('renders nav element', () => {
      expect(wrapper.find('nav').exists()).toBe(true)
    })
  })

  describe('Navigation Styling', () => {
    it('has correct height', () => {
      const nav = wrapper.find('nav')
      expect(nav.classes()).toContain('h-16')
    })

    it('has border at bottom', () => {
      const nav = wrapper.find('nav')
      expect(nav.classes()).toContain('border-b')
    })

    it('has muted background', () => {
      const nav = wrapper.find('nav')
      expect(nav.classes()).toContain('bg-muted/40')
    })

    it('has flex layout', () => {
      const nav = wrapper.find('nav')
      expect(nav.classes()).toContain('flex')
    })

    it('has gap between items', () => {
      const nav = wrapper.find('nav')
      expect(nav.classes()).toContain('gap-2')
    })

    it('has space-between justification', () => {
      const nav = wrapper.find('nav')
      expect(nav.classes()).toContain('justify-between')
    })

    it('has horizontal padding', () => {
      const nav = wrapper.find('nav')
      expect(nav.classes()).toContain('px-6')
    })

    it('has centered vertical items', () => {
      const nav = wrapper.find('nav')
      expect(nav.classes()).toContain('items-center')
    })
  })

  describe('Search Form', () => {
    it('renders search form', () => {
      const form = wrapper.find('form')
      expect(form.exists()).toBe(true)
    })

    it('form has relative positioning', () => {
      const form = wrapper.find('form')
      expect(form.classes()).toContain('relative')
    })

    it('form has h-fit height', () => {
      const form = wrapper.find('form')
      expect(form.classes()).toContain('h-fit')
    })

    it('form takes full width', () => {
      const form = wrapper.find('form')
      expect(form.classes()).toContain('w-full')
    })

    it('form has max-width constraint', () => {
      const form = wrapper.find('form')
      expect(form.classes()).toContain('max-w-96')
    })

    it('search form contains Input component', () => {
      const form = wrapper.find('form')
      expect(form.findComponent({ name: 'Input' }).exists()).toBe(true)
    })
  })

  describe('Search Input', () => {
    it('renders Input component', () => {
      const input = wrapper.findComponent({ name: 'Input' })
      expect(input.exists()).toBe(true)
    })

    it('input has full width', () => {
      const input = wrapper.findComponent({ name: 'Input' })
      expect(input.classes()).toContain('w-full')
    })

    it('input has left padding for icon', () => {
      const input = wrapper.findComponent({ name: 'Input' })
      expect(input.classes()).toContain('pl-8')
    })

    it('input has background color', () => {
      const input = wrapper.findComponent({ name: 'Input' })
      expect(input.classes()).toContain('bg-background')
    })

    it('input is of type text', () => {
      const input = wrapper.findComponent({ name: 'Input' })
      expect(input.props('type')).toBe('text')
    })

    it('input has correct placeholder', () => {
      const input = wrapper.findComponent({ name: 'Input' })
      expect(input.props('placeholder')).toBe('Search ...')
    })
  })

  describe('Dropdown Menu', () => {
    it('renders DropdownMenu component', () => {
      const dropdown = wrapper.findComponent({ name: 'DropdownMenu' })
      expect(dropdown.exists()).toBe(true)
    })

    it('renders DropdownMenuTrigger', () => {
      const trigger = wrapper.findComponent({ name: 'DropdownMenuTrigger' })
      expect(trigger.exists()).toBe(true)
    })

    it('renders DropdownMenuContent', () => {
      const content = wrapper.findComponent({ name: 'DropdownMenuContent' })
      expect(content.exists()).toBe(true)
    })
  })

  describe('Avatar Component', () => {
    it('renders Avatar component', () => {
      const avatar = wrapper.findComponent({ name: 'Avatar' })
      expect(avatar.exists()).toBe(true)
    })

    it('avatar is inside dropdown trigger', () => {
      const trigger = wrapper.findComponent({ name: 'DropdownMenuTrigger' })
      expect(trigger.findComponent({ name: 'Avatar' }).exists()).toBe(true)
    })

    it('renders AvatarImage with correct src', () => {
      const avatarImage = wrapper.findComponent({ name: 'AvatarImage' })
      expect(avatarImage.exists()).toBe(true)
      expect(avatarImage.props('src')).toBe('https://github.com/shadcn.png')
    })

    it('renders AvatarFallback with text', () => {
      const avatarFallback = wrapper.findComponent({ name: 'AvatarFallback' })
      expect(avatarFallback.exists()).toBe(true)
      expect(avatarFallback.text()).toBe('CN')
    })
  })

  describe('Menu Items', () => {
    it('renders menu label', () => {
      const label = wrapper.findComponent({ name: 'DropdownMenuLabel' })
      expect(label.exists()).toBe(true)
      expect(label.text()).toBe('My Account')
    })

    it('renders menu separator', () => {
      const separator = wrapper.findComponent({ name: 'DropdownMenuSeparator' })
      expect(separator.exists()).toBe(true)
    })

    it('renders Profile menu item', () => {
      const items = wrapper.findAllComponents({ name: 'DropdownMenuItem' })
      expect(items.some((item) => item.text() === 'Profile')).toBe(true)
    })

    it('renders Billing menu item', () => {
      const items = wrapper.findAllComponents({ name: 'DropdownMenuItem' })
      expect(items.some((item) => item.text() === 'Billing')).toBe(true)
    })

    it('renders Team menu item', () => {
      const items = wrapper.findAllComponents({ name: 'DropdownMenuItem' })
      expect(items.some((item) => item.text() === 'Team')).toBe(true)
    })

    it('renders Subscription menu item', () => {
      const items = wrapper.findAllComponents({ name: 'DropdownMenuItem' })
      expect(items.some((item) => item.text() === 'Subscription')).toBe(true)
    })

    it('renders correct number of menu items', () => {
      const items = wrapper.findAllComponents({ name: 'DropdownMenuItem' })
      expect(items.length).toBe(4)
    })
  })

  describe('Layout Structure', () => {
    it('search form is first item in nav', () => {
      const nav = wrapper.find('nav')
      const firstChild = nav.element.children[0]
      expect(firstChild.tagName).toBe('FORM')
    })

    it('dropdown menu is last item in nav', () => {
      const nav = wrapper.find('nav')
      const lastChild = nav.element.children[nav.element.children.length - 1]
      expect(lastChild.classList.contains('dropdown-menu')).toBe(true)
    })

    it('form and dropdown are siblings in nav', () => {
      const nav = wrapper.find('nav')
      expect(nav.element.children.length).toBe(2)
    })
  })

  describe('Responsive Design', () => {
    it('search form has mobile-friendly width constraints', () => {
      const form = wrapper.find('form')
      expect(form.classes()).toContain('max-w-96')
      expect(form.classes()).toContain('w-full')
    })

    it('navbar uses flex for responsive layout', () => {
      const nav = wrapper.find('nav')
      expect(nav.classes()).toContain('flex')
      expect(nav.classes()).toContain('justify-between')
    })

    it('navbar maintains spacing with gap', () => {
      const nav = wrapper.find('nav')
      expect(nav.classes()).toContain('gap-2')
    })
  })

  describe('Accessibility', () => {
    it('search input has accessible placeholder', () => {
      const input = wrapper.findComponent({ name: 'Input' })
      expect(input.props('placeholder')).toBeDefined()
      expect(input.props('placeholder')).not.toBe('')
    })

    it('avatar has fallback text for accessibility', () => {
      const fallback = wrapper.findComponent({ name: 'AvatarFallback' })
      expect(fallback.text()).toBe('CN')
    })

    it('menu items are semantic buttons', () => {
      const items = wrapper.findAll('.dropdown-item')
      expect(items.length).toBeGreaterThan(0)
    })
  })
})
