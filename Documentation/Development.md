# AGILE Development

## Sprint 0

### Initial Setup: Sprint 0
This initial phase is about setting up your foundation before you start writing application code.

### Version Control & Task Management
* **Git:** Initialize your Git repository on a platform like GitHub or GitLab. Create a `main` branch for stable releases and a `develop` branch for ongoing work. This immediately satisfies your **Git and bug tracking** requirement.
* **Bug Tracker:** Set up your project board in a tool like Jira, Trello, or GitHub Issues. Create initial "Epics" for `Web Services` and `AI Services`.

### Initial Documentation
* **System Requirements Specification (SRS):** Start your SRS document. Define the high-level goals, user personas (e.g., 'Developer', 'Learner', 'Admin'), and core features (e.g., 'User Authentication', 'Article Creation', 'AI Content Generation'). Keep it high-level for now; it will evolve.
* **Security Plan:** Create a document that outlines your commitment to security. State that you will use the STRIDE model during the design phase of each feature.

<div style="page-break-after: always;"></div>

### ## 2. Planning and Executing Your First Sprint (Sprint 1)

Now, you'll build the very first, tiny, functional piece of your application.

1. **Sprint Planning:**

   * Select a small, core feature from your SRS. A great first feature is **User Registration and Login**.

   * Break it down into tasks and create tickets in your bug tracker.

   * **Web Services Team:** Creates the API endpoints for user registration (`POST /api/users`) and login (`POST /api/login`).

   * **AI Services Team:** This team can work in parallel on a prototype, like creating a basic function that takes a block of text and applies a simple rule (e.g., replaces jargon with simpler words). This function won't be connected to the web service yet.

2. **Design and STRIDE Threat Modeling:**

   * Before writing code for the login feature, apply the **STRIDE model**. This is a critical part of designing for security.

<div style="page-break-after: always;"></div>

### ## 3. How to Implement the STRIDE Model

During your design phase for any feature (like user login or article submission), ask "What can go wrong?" using STRIDE as a guide.

* **(S)poofing Identity:**

  * **Threat:** Can a malicious user pretend to be another user or an admin?

  * **Application:** A user could submit an article under someone else's name.

  * **Mitigation:** Implement strong authentication. Use JSON Web Tokens (JWT) in your web services to verify a user's identity with every API request.

* **(T)ampering with Data:**

  * **Threat:** Can data be changed without authorization?

  * **Application:** An unauthorized user could modify a published article. The AI service could have its model file tampered with, altering its output.

  * **Mitigation:** Use secure API endpoints with proper authorization (e.g., only the article's author or an admin can edit). Use HTTPS (TLS) to prevent tampering in transit. For the AI model file, use file integrity monitoring (checksums).

* **(R)epudiation:**

  * **Threat:** Can a user perform an action and later deny it?

  * **Application:** A user submits an article that violates terms of service and then claims their account was hacked.

  * **Mitigation:** Implement robust **audit logs**. Log every important action (e.g., `[Timestamp] User 'user_id' created article 'article_id'`).

* **(I)nformation Disclosure:**

  * **Threat:** Can an attacker access data they shouldn't?

  * **Application:** A user could access another user's unpublished drafts. An attacker could find a vulnerability in the AI service API to steal the proprietary model.

  * **Mitigation:** Enforce strict **Role-Based Access Control (RBAC)** on all web service endpoints. Ensure AI service endpoints are not publicly exposed and require authentication.

* **(D)enial of Service (DoS):**

  * **Threat:** Can an attacker crash or slow down the service for legitimate users?

  * **Application:** An attacker could spam the AI article generation endpoint. This is a high-risk area as AI processing is resource-intensive.

  * **Mitigation:** Implement **rate limiting** on your API. For example, allow a user to generate only 5 articles per hour. Design your AI service to handle requests asynchronously with a queue.

* **(E)levation of Privilege:**

  * **Threat:** Can a regular user gain admin-level permissions?

  * **Application:** A regular user finds a flaw to approve articles, a permission reserved for admins.

  * **Mitigation:** Secure your authorization logic. Ensure that every API endpoint that performs a privileged action explicitly checks the user's role (e.g., `if (user.role !== 'admin') { return 403_FORBIDDEN; }`).

<div style="page-break-after: always;"></div>

### ## 4. Completing the Agile Cycle

1. **Development & Testing:**

   * Write the code for the features planned in the sprint.

   * As you code, write your **Test Cases** based on the feature's requirements and the risks identified in your STRIDE analysis. For example, create a test case to ensure a non-admin user gets a "403 Forbidden" error when trying to access an admin endpoint.

2. **Documentation:**

   * At the end of the sprint, update your **Design Document** with diagrams and notes from what you just built.

   * Update your **Test Plan** with the new test cases.

   * This iterative process ensures documentation stays relevant.

3. **Packaging Documentation:**

   * As features become stable, start writing the **Help Manuals** and **Installation Guides**. For instance, after a few sprints, you'll have a stable process for setting up the web services. Document it. This is an ongoing process, not a final step.

