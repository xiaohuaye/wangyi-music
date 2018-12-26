{
  let view = {
    el: '.page>aside>.songList-wrapper',
    template:`
        <ul class="songList">
        </ul>
    `,
    render(data){
      let $el = $(this.el)
      $el.html(this.template)
      let {songs} = data
      let liList = songs.map((song)=>{ 
        return  $('<li></li>').text(song.name)})
      $el.find('ul').empty()
      liList.map((domLi)=>{
        $el.find('ul').append(domLi)
      })
    },
    clearActive(){
      $(this.el).find('.active').removeClass('active')
    }
  }
  let model = {
    data: {
      songs:[]
    },
    find(){
      var query = new AV.Query('song')
      return query.find().then((songs)=>{
        this.data.songs = songs.map((song)=>{
          return{id:song.id, ...song.attributes}
        })
        return this.data.songs
      })
    }
  }
  let controller = {
    init(view,model){
      this.view = view
      this.model = model
      this.view.render(this.model.data)
      window.eventhub.on('upload',()=>{
        this.view.clearActive()
      })
      window.eventhub.on('create',(songData)=>{
        this.model.data.songs.push(songData)
        this.view.render(this.model.data)
      })
      this.model.find().then(()=>{
        console.log(this.model.data)
        this.view.render(this.model.data)
      })
    }
  }
  controller.init(view,model)
}