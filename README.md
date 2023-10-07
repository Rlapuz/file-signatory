
# File-signatory

File Signatory is a robust file management system designed to streamline the document signing process within organizations. It offers a user-friendly interface that allows users to upload files for approval, and these files go through a structured signing process involving four distinct roles: CESU, PROGCHAIR, DEAN, and FOCAL.


## Workflow
The signing process follows a hierarchical order, ensuring efficient approval:

1. ProgChair: The document is first sent to the Program Chair for initial review and approval.
2. CESU: After approval from the Program Chair, the document moves to the College Executive Steering Unit (CESU) for further evaluation.
3. DEAN: Once the CESU gives their approval, the document is forwarded to the Dean for the final signature.
4. FOCAL: After all signatories have signed the document, it is sent back to the Focal for the final review and approval.

Throughout the process, each signatory receives notifications with appropriate remarks indicating the pending signing tasks, ensuring transparency and accountability.

## Tech Stack

**Client:** React, Next JS, TailwindCSS,

**Server:** Node, Next JS, MongoDB


## Key Resources

- File Signatory leverages several key resources and technologies to provide a secure and efficient document management experience:

- Filestack: Filestack is used for uploading files, offering a wide range of features and ensuring secure file handling.

- MongoDB: MongoDB is the chosen database for storing uploaded files and managing data associated with the signing process.

- Next.js: The web application is built with Next.js, providing a full-stack solution with React on the frontend and Node.js on the backend.

- Tailwind CSS: Tailwind CSS is used for designing the user interface, allowing for responsive and visually appealing layouts.

- Calendar API: File Signatory includes a calendar feature that allows users to add events and manage schedules seamlessly.

- NextAuth.js: NextAuth.js is employed for robust security and authentication, ensuring that only authorized users can access and interact with the system.

- Google Provider: Google Sign-In integration enables user authentication and role management. Users not involved in the signing process can upload, view files and folders, and use the calendar.
## Deployment

To deploy this project run

```bash
  npm run deploy
```

File Signatory is deployed on Vercel, a reliable and scalable platform, ensuring high availability and performance.


## Authors

- [@Rlapuz](https://github.com/Rlapuz)


## Getting Started

To get started with File Signatory, follow the setup instructions in the documentation provided in the repository.

Thank you for choosing File Signatory for your document management needs. We are committed to making your document signing process efficient and hassle-free. If you have any questions or need assistance, please refer to the documentation or reach out to our support team.