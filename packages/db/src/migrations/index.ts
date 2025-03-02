import { createActivityLimits } from './activity-limits';

/**
 * Run all migrations in the correct order
 */
export async function runMigrations() {
  console.log('Starting migrations...');
  
  try {
    // Run activity limits migration
    await createActivityLimits();
    
    console.log('All migrations completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  }
}

// Run migrations if this file is executed directly
if (require.main === module) {
  runMigrations()
    .then(() => {
      console.log('Migrations completed');
      process.exit(0);
    })
    .catch((err) => {
      console.error('Migrations failed:', err);
      process.exit(1);
    });
} 