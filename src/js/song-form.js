{
  let view = {
    el: '.page>main',
    template:`
    <h1>新建歌曲</h1>
        <form class="form">
            <div class="row">
                <label for="">歌名<input type="text" value="__key__"></label>
            </div>
            <div class="row">
                <label for="">歌手<input type="text"></label>
            </div>
            <div class="row">
                <label for="">外链<input type="text" value="__link__"></label>
            </div>
            <div class="form-btn">
                <input type="submit" value="保存">
                <input type="reset" value="清空">
            </div>
        </form>`,
    render(data = {}){
      let placeholders = ['key','link']
      let html = this.template
      placeholders.map((string)=>{
        html = html.replace(`__${string}__`,data[string]||'')
      })
      $(this.el).html(html)
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
        this.view.render(data)
      })      
    }
  }
  controller.init(view,model)
}