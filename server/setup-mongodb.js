// MongoDB Setup Script
// This script helps you configure MongoDB connection

import readline from 'readline';
import fs from 'fs';
import path from 'path';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🔧 MongoDB Setup for Maren HR System');
console.log('=====================================\n');

console.log('Choose your MongoDB setup option:');
console.log('1. Use MongoDB Atlas (cloud database)');
console.log('2. Use local MongoDB installation');
console.log('3. Use MongoDB Memory Server (for testing)');
console.log('4. Exit\n');

rl.question('Enter your choice (1-4): ', async (choice) => {
  switch (choice) {
    case '1':
      await setupMongoDBAtlas();
      break;
    case '2':
      await setupLocalMongoDB();
      break;
    case '3':
      await setupMemoryServer();
      break;
    case '4':
      console.log('Setup cancelled.');
      rl.close();
      break;
    default:
      console.log('Invalid choice. Please run the script again.');
      rl.close();
  }
});

async function setupMongoDBAtlas() {
  console.log('\n📡 MongoDB Atlas Setup');
  console.log('======================');
  console.log('1. Go to https://www.mongodb.com/atlas');
  console.log('2. Create a free account or sign in');
  console.log('3. Create a new cluster (free tier recommended)');
  console.log('4. Click "Connect" on your cluster');
  console.log('5. Choose "Connect your application"');
  console.log('6. Copy the connection string');
  console.log('7. Replace <password> with your database password');
  console.log('8. Replace <dbname> with "maren_hr_system"\n');
  
  rl.question('Enter your MongoDB Atlas connection string: ', (connectionString) => {
    updateConfig(connectionString);
    rl.close();
  });
}

async function setupLocalMongoDB() {
  console.log('\n💻 Local MongoDB Setup');
  console.log('=====================');
  console.log('1. Download MongoDB Community Server from:');
  console.log('   https://www.mongodb.com/try/download/community');
  console.log('2. Install MongoDB following the installation guide');
  console.log('3. Start MongoDB service');
  console.log('4. The default connection string will be used\n');
  
  const localConnectionString = 'mongodb://localhost:27017/maren_hr_system';
  console.log(`Using connection string: ${localConnectionString}`);
  updateConfig(localConnectionString);
  rl.close();
}

async function setupMemoryServer() {
  console.log('\n🧠 MongoDB Memory Server Setup');
  console.log('=============================');
  console.log('This option uses an in-memory MongoDB for testing.');
  console.log('Data will be lost when the server stops.\n');
  
  const memoryConnectionString = 'mongodb://localhost:27017/maren_hr_system';
  console.log(`Using connection string: ${memoryConnectionString}`);
  updateConfig(memoryConnectionString);
  rl.close();
}

function updateConfig(connectionString) {
  try {
    const configPath = path.join(process.cwd(), 'config.js');
    let configContent = fs.readFileSync(configPath, 'utf8');
    
    // Update the MONGO_URI in the config
    configContent = configContent.replace(
      /MONGO_URI:.*$/m,
      `MONGO_URI: process.env.MONGO_URI || "${connectionString}",`
    );
    
    fs.writeFileSync(configPath, configContent);
    console.log('\n✅ Configuration updated successfully!');
    console.log('You can now start the server with: npm start');
  } catch (error) {
    console.error('❌ Error updating configuration:', error.message);
  }
}
