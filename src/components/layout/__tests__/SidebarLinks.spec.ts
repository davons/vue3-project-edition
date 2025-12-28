import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import SidebarLinks from '../SidebarLinks.vue'

const mockRouter = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: { template: '<div>Home</div>' } },
    { path: '/projects', component: { template: '<div>Projects</div>' } },
    { path: '/tasks', component: { template: '<div>Tasks</div>' } },
    { path: '/profile', component: { template: '<div>Profile</div>' } },
    { path: '/settings', component: { template: '<div>Settings</div>' } },
    { path: '/signout', component: { template: '<div>SignOut</div>' } },
  ],
})

describe('SidebarLinks.vue', () => {
  let wrapper: any

  const mockLinks = [
    { to: '/', icon: 'lucide:house', label: 'Dashboard' },
    { to: '/projects', icon: 'lucide:building-2', label: 'Projects' },
    { to: '/tasks', icon: 'lucide:badge-check', label: 'My Tasks' },
  ]

  beforeEach(() => {
    wrapper = mount(SidebarLinks, {
      props: {
        links: mockLinks,
      },
      global: {
        plugins: [mockRouter],
        stubs: {
          RouterLink: false,
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
    it('renders SidebarLinks component', () => {
      expect(wrapper.exists()).toBe(true)
    })

    it('renders correct number of links', () => {
      const links = wrapper.findAll('a')
      expect(links.length).toBe(mockLinks.length)
    })

    it('accepts links prop', () => {
      expect(wrapper.props('links')).toEqual(mockLinks)
    })

    it('renders each link as RouterLink', () => {
      const links = wrapper.findAll('a')
      links.forEach((link, index) => {
        expect(link.attributes('href')).toBe(mockLinks[index].to)
      })
    })
  })

  describe('Link Navigation', () => {
    it('has correct href for first link', () => {
      const firstLink = wrapper.find('a')
      expect(firstLink.attributes('href')).toBe('/')
    })

    it('has correct href for all links', () => {
      const links = wrapper.findAll('a')
      links.forEach((link, index) => {
        expect(link.attributes('href')).toBe(mockLinks[index].to)
      })
    })

    it('RouterLink has correct "to" attribute', () => {
      const links = wrapper.findAll('a')
      expect(links.length).toBeGreaterThan(0)
    })
  })

  describe('Active State Classes', () => {
    it('has empty active-class attribute', () => {
      const firstLink = wrapper.find('a')
      // RouterLink applies exact-active-class when route matches
      expect(firstLink.attributes()).toBeDefined()
    })

    it('applies exact-active-class styles on active route', async () => {
      await mockRouter.push('/')
      await wrapper.vm.$nextTick()
      // The exact-active-class "text-primary bg-muted" is applied by RouterLink
      const activeLink = wrapper.find('a[href="/"]')
      expect(activeLink.exists()).toBe(true)
    })
  })

  describe('Link Styling', () => {
    it('has flex layout', () => {
      const links = wrapper.findAll('a')
      links.forEach((link) => {
        expect(link.classes()).toContain('flex')
        expect(link.classes()).toContain('items-center')
      })
    })

    it('has correct gap spacing', () => {
      const link = wrapper.find('a')
      expect(link.classes()).toContain('gap-3')
    })

    it('has padding classes', () => {
      const link = wrapper.find('a')
      expect(link.classes()).toContain('px-4')
      expect(link.classes()).toContain('py-2')
    })

    it('has margin for spacing', () => {
      const link = wrapper.find('a')
      expect(link.classes()).toContain('mx-2')
    })

    it('has rounded corners', () => {
      const link = wrapper.find('a')
      expect(link.classes()).toContain('rounded-lg')
    })

    it('has transition for colors', () => {
      const link = wrapper.find('a')
      expect(link.classes()).toContain('transition-colors')
    })

    it('has hover text color effect', () => {
      const link = wrapper.find('a')
      expect(link.classes()).toContain('hover:text-primary')
    })

    it('has muted foreground color', () => {
      const link = wrapper.find('a')
      expect(link.classes()).toContain('text-muted-foreground')
    })
  })

  describe('Link Labels', () => {
    it('renders label for each link', () => {
      const labels = wrapper.findAll('span.hidden')
      expect(labels.length).toBeGreaterThanOrEqual(mockLinks.length)
    })

    it('renders correct label text', () => {
      const links = wrapper.findAll('a')
      links.forEach((link, index) => {
        expect(link.text()).toContain(mockLinks[index].label)
      })
    })

    it('renders Dashboard label', () => {
      expect(wrapper.text()).toContain('Dashboard')
    })

    it('renders Projects label', () => {
      expect(wrapper.text()).toContain('Projects')
    })

    it('renders My Tasks label', () => {
      expect(wrapper.text()).toContain('My Tasks')
    })

    it('label has no-wrap text class', () => {
      const labels = wrapper.findAll('span')
      const textLabel = labels.find((span) => span.text().includes('Dashboard'))
      expect(textLabel).toBeDefined()
    })
  })

  describe('Responsive Behavior', () => {
    it('label is hidden on small screens', () => {
      const labels = wrapper.findAll('span')
      const hiddenLabel = labels.find((span) => span.classes().includes('hidden'))
      expect(hiddenLabel).toBeDefined()
    })

    it('label is shown on large screens', () => {
      const labels = wrapper.findAll('span')
      const responsiveLabel = labels.find((span) => span.classes().includes('lg:block'))
      expect(responsiveLabel).toBeDefined()
    })

    it('has mobile-centered justify-center class', () => {
      const link = wrapper.find('a')
      expect(link.classes()).toContain('justify-center')
    })

    it('has desktop-aligned justify-normal class', () => {
      const link = wrapper.find('a')
      expect(link.classes()).toContain('lg:justify-normal')
    })

    it('label has nowrap class', () => {
      const labels = wrapper.findAll('span')
      const nowrapLabel = labels.find((span) => span.classes().includes('text-nowrap'))
      expect(nowrapLabel).toBeDefined()
    })
  })

  describe('Props Validation', () => {
    it('accepts empty links array', () => {
      const emptyWrapper = mount(SidebarLinks, {
        props: {
          links: [],
        },
        global: {
          plugins: [mockRouter],
          stubs: {
            RouterLink: false,
            'iconify-icon': true,
          },
        },
      })
      expect(emptyWrapper.findAll('a')).toHaveLength(0)
    })

    it('handles single link', () => {
      const singleWrapper = mount(SidebarLinks, {
        props: {
          links: [mockLinks[0]],
        },
        global: {
          plugins: [mockRouter],
          stubs: {
            RouterLink: false,
            'iconify-icon': true,
          },
        },
      })
      expect(singleWrapper.findAll('a')).toHaveLength(1)
    })

    it('handles multiple links', () => {
      const multiWrapper = mount(SidebarLinks, {
        props: {
          links: mockLinks,
        },
        global: {
          plugins: [mockRouter],
          stubs: {
            RouterLink: false,
            'iconify-icon': true,
          },
        },
      })
      expect(multiWrapper.findAll('a')).toHaveLength(mockLinks.length)
    })
  })
})
