import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/private/", "/admin/", "/profile/", "/dashboard/"],
        },
        sitemap: "https://www.kuttawaala.com/sitemap.xml",
    };
}
