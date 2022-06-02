const setItem = (headers,data) =>{
  window.localStorage.setItem('id',data.id)
  window.localStorage.setItem('access-token',headers['access-token'])
  window.localStorage.setItem('uid',headers.uid)
  window.localStorage.setItem('client',headers.client)
  window.localStorage.setItem('name',data.name)
  window.localStorage.setItem('image',data.image.url)
}

export default setItem