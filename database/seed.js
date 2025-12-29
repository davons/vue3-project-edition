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
        description: faker.lorem.sentence(),
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

async function seedTasks(numberOfTasks = 10) {
  try {
    const { data: projects, error: fetchError } = await supabase.from('project').select('id')
    if (fetchError) {
      throw fetchError
    }

    if (!projects || projects.length === 0) {
      console.log('No projects found to associate tasks with.')
      return
    }

    const tasks = []

    for (let i = 0; i < numberOfTasks; i++) {
      const name = faker.lorem.words(3)
      const project = faker.helpers.arrayElement(projects)
      tasks.push({
        name: name,
        slug: name.toLocaleLowerCase().replace(/\s+/g, '-'),
        status: faker.helpers.arrayElement(['cancelled', 'in-progress', 'completed']),
        description: faker.lorem.paragraph(),
        due_date: faker.date.future(),
        collaborators: faker.helpers.arrayElements([1, 2, 3, 4, 5]),
        project_id: project.id,
      })
    }

    const { data, error } = await supabase.from('task').insert(tasks)
    if (error) {
      throw error
    }

    console.log(`Successfully seeded ${tasks.length} tasks`)
    console.log('Tasks:', data)
  } catch (error) {
    console.error('Error seeding tasks:', error)
  }
}

seedProjects(6)

seedTasks(11)
