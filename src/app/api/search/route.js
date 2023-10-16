// import { NextResponse } from "next/server";

// const fetchFiles = async (userId) => {
//     const response = await fetch("http://localhost:3000/api/file?userId=${userId}", {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//         },
//     });

//     const files = await response.json();
//     // console.log('Received files:', files);
//     return files;


// }

// export default async function search(req) {
//     const userId = req.query.userId;
//     const files = await fetchFiles(userId);
//     return NextResponse.json(files);
// }

