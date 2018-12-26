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
      this.active()
      window.eventhub.on('upload' ,(data)=>{
        this.active()
      })
      window.eventhub.on('select',(data)=>{
        console.log(data)
        this.deactive()
      })
    },
    active(){
      console.log($(this.view.el))
      $(this.view.el).addClass('active')
    },
    deactive(){
      $(this.view.el).removeClass('active')
    }
  }
  controller.init(view,model)
}