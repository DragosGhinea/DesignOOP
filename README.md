![main-page](https://github.com/DragosGhinea/DesignOOP/blob/main/bachelor-latex/images/main-page-desktop.png)

# Design patterns visualizer and documentation web platform - DesignOOP

## Motivation

I have a strong interest in object-oriented programming and design patterns, which simplify complex software. Teaching is a powerful method to deepen understanding, so I've been eager to create educational resources on design patterns. Leveraging my college studies, I aim to build a practical, functional full-stack application using various technologies.

## Purpose

The application provides a platform for learning and creating courses on design patterns. Initially, it was a repository of hardcoded courses, but now courses are dynamically generated from JSON data for easier editing and management. 

Custom tools were developed to enhance user experience, including an integrated editor with custom linting and a graphics creator. The platform offers official courses and tools for creating new ones, catering to both experienced developers and beginners. By separating content from design, the web platform ensures a consistent look and feel across all courses, allowing creators to focus on content.

## Features

- **Dynamic Course Generation:** Courses generated from JSON data.
- **Integrated Editor:** Custom editor with linting.
- **Graphics Creator:** Tool for visual aids.
- **Learning and Teaching Tools:** Resources for creating and learning design patterns.
- **Consistent Design:** Web platform manages design for uniformity.

## Technologies and Tools

![Technologies](https://github.com/DragosGhinea/DesignOOP/blob/main/images/technologies.png)

## Flows

Some of the flows this application contains, both from the user's perspective and the system's. (They are better described in the documentation pdf.)

### Reading Courses

![reading-courses](https://github.com/DragosGhinea/DesignOOP/blob/main/images/courses-reader-flow.png)

### Managing Courses

![managing-courses](https://github.com/DragosGhinea/DesignOOP/blob/main/images/courses-manage-flow.png)

### Authentication Flow

![auth](https://github.com/DragosGhinea/DesignOOP/blob/main/images/auth-flow.png)

### Accessing Resources

![reading-courses](https://github.com/DragosGhinea/DesignOOP/blob/main/images/accessing-resources-flow.png)

## Web Application Footage

Some screenshots from inside the website.

![search-page](https://github.com/DragosGhinea/DesignOOP/blob/main/bachelor-latex/images/search-page-preview.png)

![live-preview-editor](https://github.com/DragosGhinea/DesignOOP/blob/main/bachelor-latex/images/live-preview-editor.png)

![graphics-editor](https://github.com/DragosGhinea/DesignOOP/blob/main/bachelor-latex/images/graphic-editor.png)

## Documentation

For the full documentation of the project please check [Documentation.pdf](Documentation.pdf). It contains a detailed explanation for the development process of this web application.

### Table of Contents

1. **Introduction**
   - 1.1 Motivation
   - 1.2 Purpose
   - 1.3 Similar Platforms

2. **Architecture and Choice of Technology**
   - 2.1 Backend Framework
     - 2.1.1 Initial attempts
     - 2.1.2 Final choice
   - 2.2 Frontend Framework
     - 2.2.1 Initial attempts
     - 2.2.2 Final choice
   - 2.3 Frontend Optimization
     - 2.3.1 SWR
   - 2.4 Databases
     - 2.4.1 H2 Database
     - 2.4.2 PostgreSQL
     - 2.4.3 MongoDB
     - 2.4.4 Connecting to database
   - 2.5 Deployment
     - 2.5.1 Running and Compiling
     - 2.5.2 Docker
     - 2.5.3 Docker-Compose
     - 2.5.4 Extending

3. **Backend Explained**
   - 3.1 Project Configuration
     - 3.1.1 Parent Project
     - 3.1.2 Users Module Project
     - 3.1.3 Courses Module Project
   - 3.2 Folder structure of a module
   - 3.3 Repositories
     - 3.3.1 Users Module
     - 3.3.2 Courses Module
   - 3.4 Services
     - 3.4.1 Users Module
     - 3.4.2 Courses Module
   - 3.5 Controllers
     - 3.5.1 Users Module
     - 3.5.2 Courses Module
   - 3.6 Security
   - 3.7 Testing

4. **Frontend Explained**
   - 4.1 Project Configuration
     - 4.1.1 NextJS
     - 4.1.2 VSCode + Extensions
     - 4.1.3 Tailwind
     - 4.1.4 Middleware
   - 4.2 Folder structure
   - 4.3 Themes and Design
     - 4.3.1 Light and Dark
     - 4.3.2 Shadcn/UI
     - 4.3.3 Typography
     - 4.3.4 Responsive
   - 4.4 Main Page
     - 4.4.1 Waves
     - 4.4.2 Navbar
     - 4.4.3 Suggestions
   - 4.5 Profile
     - 4.5.1 Details
     - 4.5.2 Account Usage
   - 4.6 Courses
     - 4.6.1 Layout
     - 4.6.2 Search
     - 4.6.3 Browsing History
     - 4.6.4 View
   - 4.7 Course Editor
     - 4.7.1 Course Structure
     - 4.7.2 JSON Editor
     - 4.7.3 Custom JSON Parser and Grammar
     - 4.7.4 Linting
     - 4.7.5 Autocomplete
     - 4.7.6 AutoRepair JSON
     - 4.7.7 Live Preview
   - 4.8 Graphics/Diagrams
     - 4.8.1 Diagrams Library
     - 4.8.2 Nodes
     - 4.8.3 Edges
     - 4.8.4 Graphic Object
   - 4.9 Security
     - 4.9.1 NextAuth Configuration
     - 4.9.2 OAuth2
     - 4.9.3 User Sessions

5. **Web Platform Flows**
   - 5.1 Reading courses
   - 5.2 Manage courses
   - 5.3 User authentication
   - 5.4 Accessing Resources

6. **Conclusions and Future Work**
   - 6.1 Conclusions
   - 6.2 Future Work

**Bibliography**