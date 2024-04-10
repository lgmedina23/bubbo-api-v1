## Create the Todo App

1. **Install NestJS CLI:**

    ```bash
    npm install -g @nestjs/cli
    ```

2. **Create a new NestJS project:**

    ```bash
    nest new nestjs-todo-app
    ```

3. **Navigate into the project directory:**

    ```bash
    cd nestjs-todo-app
    ```

4. **Install dependencies:**

    ```bash
    npm install
    ```

5. **Set up PostgreSQL:**

    - Make sure PostgreSQL is running.
    - Create a new PostgreSQL database for the application.

6. **Configure environment variables:**

    - Rename `.env.example` file to `.env` and fill in the necessary environment variables such as `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, and `DB_DATABASE`.

7. **Create a new Todo module using Nest CLI:**

    ```bash
    nest g module todos
    ```

8. **Create a Todo entity class under the new module:**

    ```bash
    nest g class todos/entities/todo
    ```

9. **Create a Todo service under the new module:**

    ```bash
    nest g service todos/services/todo
    ```

10. **Create a Todo controller under the new module:**

    ```bash
    nest g controller todos/controllers/todo
    ```

11. **Update `src/app.module.ts` to import and use the new Todo module:**

    ```typescript
    import { Module } from '@nestjs/common';
    import { ConfigModule } from '@nestjs/config';
    import { TypeOrmModule } from '@nestjs/typeorm';
    import { Todo } from './entities/todo.entity';
    import { TodosModule } from './todos/todos.module';
    import { AppController } from './app.controller';
    import { AppService } from './app.service';

    @Module({
      imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT, 10),
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
          ssl: {
            rejectUnauthorized: false,
          },
          entities: [
            Todo
          ],
          synchronize: true,
          migrations: [],
          subscribers: [],
        }),
        TodosModule
      ],
      controllers: [AppController],
      providers: [AppService],
    })
    export class AppModule {}
    ```

12. **Change the application port to 8080 (Default port for elastic Beanstalck):**

    - Open the `src/main.ts` file.
    - Update the `await app.listen()` line to use port 8080:

    ```typescript
    await app.listen(process.env.PORT);
    ```

13. **Start the application:**

    ```bash
    npm run start:dev
    ```

14. **Open your browser and navigate to `http://localhost:3000` to see the app in action.**



## Deploy To Elastic Beanstalck

## AWS Setup

### a. IAM (Identity and Access Management) Setup:

1. Go to the [AWS Management Console](https://aws.amazon.com/console/) and navigate to IAM.
2. Create a new IAM role with necessary permissions for Elastic Beanstalk to access other AWS services like RDS and EC2.
3. Attach policies like `AWSElasticBeanstalkFullAccess`, `AmazonRDSFullAccess`, and `AmazonEC2FullAccess` to the IAM role.

### b. RDS (Relational Database Service) Setup:

1. Navigate to the [RDS service](https://aws.amazon.com/rds/) in the AWS Management Console.
2. Create a new PostgreSQL database instance.
3. Configure the database instance with desired specifications (instance type, storage, etc.).
4. Make sure to note down the endpoint, username, password, and database name for later use.
5. Grant acces do the database from my local machine (make it public)

## Configuring Elastic Beanstalk

1. **Navigate to Elastic Beanstalk:**
   - Go to the [AWS Management Console](https://aws.amazon.com/console/).
   - In the "Find Services" search bar, type "Elastic Beanstalk" and select it from the options.

2. **Create a New Application:**
   - Click on "Create Application".
   - Enter a name for your application.
   - Optionally, add a description.
   - Click on "Create".

3. **Create a New Environment:**
   - Once your application is created, click on "Create a new environment".
   - Choose the web server environment type that matches your application (e.g., Node.js, Python, PHP, etc.).
   - Select the appropriate platform version.
   - Choose a preconfigured sample application or upload your application code.
   - Click on "Configure more options" to customize your environment settings if needed.

4. **Configure Environment Settings:**
   - Configure the environment settings such as instance type, key pair (for SSH access), environment variables, and database configuration (if using RDS).
   - Configure db environment also exposed port
   - Optionally, enable logging, monitoring, and other advanced settings as per your requirements.

5. **Create Environment:**
   - Review the configuration details.
   - Click on "Create environment" to launch your Elastic Beanstalk environment.

6. **Wait for Deployment:**
   - Elastic Beanstalk will start creating your environment and deploying your application.
   - This process may take several minutes to complete. You can monitor the progress in the Elastic Beanstalk console.

7. **Accessing Your Application:**
   - Once the deployment is complete, Elastic Beanstalk will provide you with a URL where you can access your application.
   - Click on the URL to view your deployed application in a web browser.

8. **Manage and Monitor:**
   - You can manage and monitor your Elastic Beanstalk environment from the AWS Management Console.
   - View environment health, logs, and metrics to monitor the performance of your application.