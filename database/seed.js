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
    const projects = []

    for (let i = 0; i < numberOfProjects; i++) {
      const name = faker.lorem.words(2)
      projects.push({
        name: name,
        slug: name.toLocaleLowerCase().replace(/\s+/g, '-'),
        status: faker.helpers.arrayElement(['cancelled', 'in-progress', 'completed']),
        collaborators: faker.helpers.arrayElements([1, 2, 3, 4, 5]),
      })
    }

    const { data, error } = await supabase.from('project').insert(projects)
    if (error) {
      throw error
    }

    console.log(`Successfully seeded ${projects.length} projects`)
    console.log('Projects:', data)
  } catch (error) {
    console.error('Error seeding database:', error)
  }
}

seedProjects(6)
