import { FilterQuery, Query } from "mongoose"

class QueryBuilder<I> {
  constructor(
    public queryModel: Query<I[], I>,
    public query: Record<string, unknown>
  ) {}

  search(searchAbleFields: string[]) {
    const search = this?.query?.search || ""

    this.queryModel = this.queryModel.find({
      $or: searchAbleFields.map(
        (field) =>
          ({
            [field]: { $regex: search, $options: "i" },
          } as FilterQuery<I>)
      ),
    })

    return this
  }

  filter() {
    let queryObj = { ...this.query }
    // Excluded fields
    const excludeFields = ["search", "sort", "limit", "page", "fields"]
    excludeFields.forEach((element) => delete queryObj[element])

    this.queryModel = this.queryModel.find(queryObj as FilterQuery<I>)

    return this
  }

  sort() {
    const sort =
      (this?.query?.sort as string)?.split(",")?.join(" ") || "-createdAt"
    this.queryModel = this.queryModel.sort(sort as string)
    return this
  }

  pagination() {
    const page = Number(this?.query?.page) || 1
    const limit = Number(this?.query?.limit) || 10
    const skip = (page - 1) * limit

    this.queryModel = this.queryModel.skip(skip).limit(limit)

    return this
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(",")?.join(" ") || "-__v"
    this.queryModel = this.queryModel.select(fields)
    return this
  }

  async countTotal() {
    const totalQueries = this.queryModel.getFilter()
    const total = await this.queryModel.model.countDocuments(totalQueries)
    const page = Number(this?.query?.page) || 1
    const limit = Number(this?.query?.limit) || 10
    const totalPage = Math.ceil(total / limit)

    return {
      page,
      limit,
      total,
      totalPage,
    }
  }
}

export default QueryBuilder
