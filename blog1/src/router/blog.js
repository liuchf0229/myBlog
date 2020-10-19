const { 
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
} = require('../controller/blog') 
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req,res)=>{
  const method = req.method //GET POST
  let id = req.query.id
  // 获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    let author = req.query.author || ''
    const keyword = req.query.keyword || ''
    const listData = getList(author, keyword)
    console.log('router-/api/blog/list=',listData)

    return new SuccessModel(listData)
  }

  // 获取博客详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    const data = getDetail(id)
    return new SuccessModel(data)
  }

  // 新建一篇博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    console.log('/api/blog/new=',req.body)
    const date = newBlog(req.body)
    return new SuccessModel(date)
  }

  // 更新一篇博客
  if (method === 'POST' && req.path === '/api/blog/update') {
    const result = updateBlog(id, req.body)
    if (result) {
      return new SuccessModel() 
    } else {
      return ErrorModel('更新博客失败')
    }
  }

  // 删除一篇博客
  if (method === 'POST' && req.path === '/api/blog/del') {
    const result = deleteBlog(id)
    if (result) {
      return new SuccessModel() 
    } else {
      return ErrorModel('删除博客失败')
    }
  }
}

module.exports = handleUserRouter