import { Request } from "express";

export const getCourtFilters = (req: Request) => {
    const page = req.query.page ? parseInt(req.query.page as string) : undefined;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string) : undefined;
    const sportId = req.query.sport_id as string | undefined;

    const isFeatured = req.query.is_featured
        ? req.query.is_featured.toString().replace(/"/g, "") === "true"
        : undefined;

    const isAvailable = req.query.is_available
        ? req.query.is_available.toString().replace(/"/g, "") === "true"
        : undefined;

    return { page, pageSize, sportId, isFeatured, isAvailable };
};
