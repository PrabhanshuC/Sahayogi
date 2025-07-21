# Sahayogi (Article Application)
Create an article application using MERN stack (similar to medium.com).

## Contents
* Abstract
* Requirements
    * Project Scope
        * Goal
        * Deliverables
        * Requirements
    * Features
    * Gathering required data
* Application Design
    * Application Structure
    * Application Behavior
    * Pricing Models
* Design Implementation
    * Web Services
        * Backend
            * Implementing Models
            * Managing Data Flow using REST API's
            * Creating Basic Interfaces
            * Implementing Authentication and Authorization
            * Implementing Security Features
        * Frontend
            * Implementing Functional Interfaces
            * Implementing Non-functional Features
            * Implementing Security Features
            * Enhancing User Experience and Adding Features
    * AI Services
* Testing
    * Unit Testing
    * Integration Testing
    * Penetration Testing
* Deployment
    * Free Domain Registration
    * Free Hosting
    * Deploying Website
    * Monitoring

<div style="page-break-after: always;"></div>

## Abstract
Software development involves a vast number of programming languages and frameworks, each supported by its own official documentation. This documentation is frequently dense and complex, posing a significant hurdle for both newcomers and experienced professionals. As a result, a substantial amount of time is spent researching and deciphering technical instructions rather than on active development.

To address this inefficiency, this project proposes the creation of a centralized web application to serve as a library of technical articles. The platform is designed to function as a universal learning resource, similar in concept to MDN Web Docs but covering a much wider range of technologies. Its purpose is to provide clear, standardized guides for implementing software features.

Each article will translate complex information from official sources into simplified, step-by-step instructions. An integral feature of the platform is the use of Artificial Intelligence to help automate the generation of content. This allows for the creation of a broad and scalable library of articles, ensuring comprehensive coverage of both foundational and advanced topics.

The primary objective is to produce an application that drastically reduces the time required to find and understand technical information. By offering a reliable source for clear implementation guides, the project aims to accelerate learning, streamline development cycles, and improve the overall productivity of its users.

<div style="page-break-after: always;"></div>

## Requirements
The application consists of articles, defining working and implementation of features specified in official documentations in simple steps, but following the language standards (similar to MDN Web Docs but for all languages and frameworks).

### Project Scope
The application would provide articles to help developers and learners get information about standardised implementation of concepts provided by a programming language or framework.

An article would contain simplified official documentations and references regarding the topic, allowing for easier implementation and the need for doing so.

AI would help automate the process and generate articles to help cover most basic and advanced implementation of features.

#### Goal
An application that displays implementations provided by a programming language or framework to reduce development time spent searching or understanding the underlying concept.

#### Deliverables
* A website of articles
* An extension for VS Code or other open source text editor or IDE.
* A dedicated IDE
* Free version for non-commercial use
* Paid versions for commercial use

#### Requirements
* Documentation text
* ML model to extract and generate articles
* ML model to categorize and filter user generated articles
* ML model to manage working of IDE or extensions

<div style="page-break-after: always;"></div>

### Features

#### Functional Features
* Admin Login
* Admin Dashboard
* User Registration
* User Login
* User Dashboard
* User Deletion
* Payment Processing
* Article Categories
* Article Search
* Article Publishing
* Article Edit
* Article Deletion
* Syntax Parser
* Linter
* Suggestions

#### Non-Functional Requirements
* Response time of ~5 seconds for web services
* DDOS attack prevention
* MITM attack prevention
* XSS, CSRF and SSRF prevention
* Multi-factor authentication
* Authorization
* Logging
* Monitoring
* Modularization for maintenance
* Easy to use
* Scalable
* Reliable
* Compatible with popular browsers and devices

---

### Required Data
* Permission validation to fetch and train on documentations provided by programming language and framework websites
* Permission validation to post articles on features provided in the documentations

<div style="page-break-after: always;"></div>

## Application Design

### Application Structure

#### Database
```
	Article
    {
    	string title;
        string content;
        string reference;
        User author;
        string date;
        string tags;
        string category;
    }

    User
    {
    	string name;
        string username;
        string password;
        string about;
        string email;
        string social_media[];
    }

    Admin
    {
    	string username;
        string password;
    }
```

#### Application
```
	Login
    {
    	string username;
        string email;
        string password;
    }

    Registration
    {
    	bool is_organization;
    	string name;
    	string username;
        string email;
        string password;
    }

    Article Management
    {
    	Search;
    	Read;
    	Write;
        Update;
        Delete;
        Comment;
        Like;
    }

    Account Management
    {
    	Update;
        Delete;
        Followers;
        Following;
    }
```

#### Legal
```
	Privacy Policy;
    Data Collection [requires consent];
    Terms of use;
```

#### Model
```
	Generator
    {
    	URL fetch;
        Category categorize;
        Article write;
    }

    User Preferences
    {
    	Suggested Articles;
        Roadmaps;
        Model Training [requires consent];
    }
    
	Security
    {
    	Prevent DOS;
    	Prevent DDOS;
        Mitigate OWASP Top 10;
        Validate User Article;
    	Monitor activity;
    }

    Extension
    {
    	Suggest standard;
        Autocomplete code;
    }

    IDE
    {
    	Generate User Pattern;
        Predict Implementation;
        Model Training [requires consent];
    }
```

<div style="page-break-after: always;"></div>

### Application Behavior

<div style="page-break-after: always;"></div>

### Pricing Models

#### Free Version
* Website access
* Basic IDE
* Basic Security Practices
* No commercial use

#### One - Paid Version
* Free Version Benefits
* Advanced IDE
* Advanced Security Practices
* Commercial use

#### Few - Paid Version
* One Paid Version Benefits
* Technology Stack Management
* 

#### Organization - Paid Version
* Few Paid Version Benefits
* Advanced IDE
* Advanced Security Practices
* Commercial use

<div style="page-break-after: always;"></div>

## Design Implementation

### Backend