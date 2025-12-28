import dotenv from 'dotenv'
import { faker } from '@faker-js/faker'
import { createClient } from '@supabase/supabase-js'

// Load environment variables
dotenv.config()

const supabaseUrl = process.env.VITE_SUPABASE_URL
const serviceKey = process.env.SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceKey) {
  console.error('Missing required environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceKey)

async function seedProjects(numberOfProjects = 10) {
  try {
    const name = faker.lorem.word(3)
    const project = []

    for (let i = 0; i < numberOfProjects; i++) {
      project.push({
        name: name,
        slug: name.toLocaleLowerCase().replace(/\s+/g, '-'),
        status: faker.helpers.arrayElement(['cancelled', 'in-progress', 'completed']),
        collaborators: faker.helpers.arrayElements([1, 2, 3, 4, 5]),
      })
    }

    const { data, error } = await supabase.from('project').insert(project)
    if (error) {
      throw error
    }

    console.log('Database seeded successfully:', data)
  } catch (error) {
    console.error('Error seeding database:', error)
  }
}

seedProjects(6)
