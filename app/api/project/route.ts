import { HttpStatus, HttpStatusCode } from "@/constants/http-status";
import { getProjectsByUser } from "@/db/services/product";
import { withAuthorizedApiHandler } from "@/lib/api-handler";
import { ApiResponse } from "@/lib/api-response";
import { User } from "next-auth";

const sample_data = [
  {
    "id": "project_1",
    "title": "Eco-Friendly Home Design",
    "slides": null,
    "userId": "user_id_1",
    "outlines": ["Introduction", "Materials", "Design Process", "Final Product"],
    "isDeleted": false,
    "isSellable": true,
    "variantId": "variant_1",
    "thumbnail": "/images/test/project_thumbnail_1.jpg",
    "themeName": "light",
    "createdAt": "2023-10-01T10:00:00Z",
    "updatedAt": "2023-10-01T10:00:00Z"
  },
  {
    "id": "project_2",
    "title": "AI-Powered Chatbot",
    "slides": { "slide1": "Introduction", "slide2": "Features", "slide3": "Demo" },
    "userId": "user_id_1",
    "outlines": ["Overview", "Technology Stack", "Implementation", "Testing"],
    "isDeleted": false,
    "isSellable": false,
    "variantId": null,
    "thumbnail": "/images/test/project_thumbnail_1.jpg",
    "themeName": "dark",
    "createdAt": "2023-10-02T11:00:00Z",
    "updatedAt": "2023-10-02T11:00:00Z"
  },
  {
    "id": "project_3",
    "title": "Sustainable Fashion Guide",
    "slides": null,
    "userId": "user_id_1",
    "outlines": ["Introduction", "Materials", "Brands", "Conclusion"],
    "isDeleted": false,
    "isSellable": true,
    "variantId": "variant_2",
    "thumbnail": "/images/test/project_thumbnail_1.jpg",
    "themeName": "light",
    "createdAt": "2023-10-03T12:00:00Z",
    "updatedAt": "2023-10-03T12:00:00Z"
  },
  {
    "id": "project_4",
    "title": "Mobile App for Fitness",
    "slides": { "slide1": "Home Screen", "slide2": "Workout Plans", "slide3": "Progress Tracking" },
    "userId": "user_id_1",
    "outlines": ["Concept", "Design", "Development", "Launch"],
    "isDeleted": false,
    "isSellable": true,
    "variantId": "variant_3",
    "thumbnail": "/images/test/project_thumbnail_1.jpg",
    "themeName": "dark",
    "createdAt": "2023-10-04T13:00:00Z",
    "updatedAt": "2023-10-04T13:00:00Z"
  },
  {
    "id": "project_5",
    "title": "Urban Gardening Handbook",
    "slides": null,
    "userId": "user_id_1",
    "outlines": ["Introduction", "Tools", "Techniques", "Case Studies"],
    "isDeleted": false,
    "isSellable": false,
    "variantId": null,
    "thumbnail": "/images/test/project_thumbnail_1.jpg",
    "themeName": "light",
    "createdAt": "2023-10-05T14:00:00Z",
    "updatedAt": "2023-10-05T14:00:00Z"
  },
  {
    "id": "project_6",
    "title": "Blockchain for Beginners",
    "slides": { "slide1": "What is Blockchain?", "slide2": "Use Cases", "slide3": "Future Trends" },
    "userId": "user_id_1",
    "outlines": ["Basics", "Applications", "Challenges", "Conclusion"],
    "isDeleted": false,
    "isSellable": true,
    "variantId": "variant_4",
    "thumbnail": "/images/test/project_thumbnail_1.jpg",
    "themeName": "dark",
    "createdAt": "2023-10-06T15:00:00Z",
    "updatedAt": "2023-10-06T15:00:00Z"
  },
  {
    "id": "project_7",
    "title": "Minimalist Living Guide",
    "slides": null,
    "userId": "user_id_1",
    "outlines": ["Philosophy", "Decluttering", "Lifestyle Changes", "Benefits"],
    "isDeleted": false,
    "isSellable": true,
    "variantId": "variant_5",
    "thumbnail": "/images/test/project_thumbnail_1.jpg",
    "themeName": "light",
    "createdAt": "2023-10-07T16:00:00Z",
    "updatedAt": "2023-10-07T16:00:00Z"
  },
  {
    "id": "project_8",
    "title": "Virtual Reality in Education",
    "slides": { "slide1": "Introduction", "slide2": "Applications", "slide3": "Challenges" },
    "userId": "user_id_1",
    "outlines": ["Overview", "Case Studies", "Future Prospects"],
    "isDeleted": false,
    "isSellable": false,
    "variantId": null,
    "thumbnail": "/images/test/project_thumbnail_1.jpg",
    "themeName": "dark",
    "createdAt": "2023-10-08T17:00:00Z",
    "updatedAt": "2023-10-08T17:00:00Z"
  },
  {
    "id": "project_9",
    "title": "Healthy Meal Plans",
    "slides": null,
    "userId": "user_id_1",
    "outlines": ["Breakfast", "Lunch", "Dinner", "Snacks"],
    "isDeleted": false,
    "isSellable": true,
    "variantId": "variant_6",
    "thumbnail": "/images/test/project_thumbnail_1.jpg",
    "themeName": "light",
    "createdAt": "2023-10-09T18:00:00Z",
    "updatedAt": "2023-10-09T18:00:00Z"
  },
  {
    "id": "project_10",
    "title": "DIY Home Repairs",
    "slides": { "slide1": "Tools", "slide2": "Common Issues", "slide3": "Step-by-Step Guides" },
    "userId": "user_id_1",
    "outlines": ["Introduction", "Tools Needed", "Repair Guides", "Safety Tips"],
    "isDeleted": false,
    "isSellable": true,
    "variantId": "variant_7",
    "thumbnail": "/images/test/project_thumbnail_1.jpg",
    "themeName": "dark",
    "createdAt": "2023-10-10T19:00:00Z",
    "updatedAt": "2023-10-10T19:00:00Z"
  }
]

export const GET = withAuthorizedApiHandler( async (req: Request, user: User) => {
    const projects = await getProjectsByUser(user.id);

    return new ApiResponse({
      success: true,
      message: "list of projects that owned by user",
      status: HttpStatus.SUCCESS,
      statusCode: HttpStatusCode.OK,
      data: sample_data,
    });
  }
);
