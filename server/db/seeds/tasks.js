/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('tasks').del()
  await knex('tasks').insert([
    { id: 1, task: 'Dust', completed: false },
    { id: 2, task: 'Dishes', completed: false },
    { id: 3, task: 'Cook', completed: false },
  ])
}
