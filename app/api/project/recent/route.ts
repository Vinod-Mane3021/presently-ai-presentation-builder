import { HttpStatus, HttpStatusCode } from "@/constants/http-status";
// import { getRecentProjects } from "@/db/services/product";
import { withAuthorizedApiHandler } from "@/lib/api-handler";
import { ApiResponse } from "@/lib/api-response";
import { waitFor } from "@/lib/utils";
import { User } from "next-auth";

const sample_data = [
  {
    id: "project_1",
    title: "Eco-Friendly Home Design",
    slides: null,
    user_id: "user_id_1",
    outlines: ["Introduction", "Materials", "Design Process", "Final Product"],
    is_deleted: false,
    is_sellable: true,
    variant_id: "variant_1",
    thumbnail: "/images/test/project_thumbnail_1.jpg",
    theme_name: "light",
    created_at: "2024-10-01T10:00:00Z",
    updated_at: "2024-10-01T10:00:00Z",
  },
  {
    id: "project_2",
    title: "AI-Powered Chatbot",
    slides: { slide1: "Introduction", slide2: "Features", slide3: "Demo" },
    user_id: "user_id_1",
    outlines: ["Overview", "Technology Stack", "Implementation", "Testing"],
    is_deleted: false,
    is_sellable: false,
    variant_id: null,
    thumbnail: "/images/test/project_thumbnail_1.jpg",
    theme_name: "dark",
    created_at: "2024-10-02T11:00:00Z",
    updated_at: "2024-10-02T11:00:00Z",
  },
  {
    id: "project_3",
    title: "Sustainable Fashion Guide",
    slides: null,
    user_id: "user_id_1",
    outlines: ["Introduction", "Materials", "Brands", "Conclusion"],
    is_deleted: false,
    is_sellable: true,
    variant_id: "variant_2",
    thumbnail: "/images/test/project_thumbnail_1.jpg",
    theme_name: "light",
    created_at: "2024-10-03T12:00:00Z",
    updated_at: "2024-10-03T12:00:00Z",
  },
  {
    id: "project_4",
    title: "Mobile App for Fitness",
    slides: {
      slide1: "Home Screen",
      slide2: "Workout Plans",
      slide3: "Progress Tracking",
    },
    user_id: "user_id_1",
    outlines: ["Concept", "Design", "Development", "Launch"],
    is_deleted: false,
    is_sellable: true,
    variant_id: "variant_3",
    thumbnail: "/images/test/project_thumbnail_1.jpg",
    theme_name: "dark",
    created_at: "2024-10-04T13:00:00Z",
    updated_at: "2024-10-04T13:00:00Z",
  },
  {
    id: "project_5",
    title: "Urban Gardening Handbook",
    slides: null,
    user_id: "user_id_1",
    outlines: ["Introduction", "Tools", "Techniques", "Case Studies"],
    is_deleted: false,
    is_sellable: false,
    variant_id: null,
    thumbnail: "/images/test/project_thumbnail_1.jpg",
    theme_name: "light",
    created_at: "2024-10-05T14:00:00Z",
    updated_at: "2024-10-05T14:00:00Z",
  },
];

export const GET = withAuthorizedApiHandler(
  async (req: Request, user: User) => {
    console.log({ req, user });
    // const recentProjects = getRecentProjects(user.id)
    await waitFor(2000)
    return new ApiResponse({
      success: true,
      message: "list of projects that owned by user",
      status: HttpStatus.SUCCESS,
      statusCode: HttpStatusCode.OK,
      data: sample_data,
    });
  }
);
