{
  let view = {
    el: '.newSong',
    template:`新建歌曲`,
    render(data){
      $(this.el).html(this.template)
    }
  }
  let model = {}
  let controller = {
    view : null,
    model : null, 
    init(view,model){
      this.view = view
      this.model = model
      this.view.render(this.model.data)
      window.eventhub.on('upload' ,(data)=>{
        console.log('newsong得到了data')
        console.log(data)
      })
    }
  }
  controller.init(view,model)
}