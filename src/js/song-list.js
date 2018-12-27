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
        return  $('<li></li>').text(song.name).attr('data-song-id',song.id)})
      $el.find('ul').empty()
      liList.map((domLi)=>{
        $el.find('ul').append(domLi)
      })
    },
    clearActive(){
      $(this.el).find('.active').removeClass('active')
    },
    activeItem(item){
      let $li = $(item)
      $li.addClass('active').siblings('.active').removeClass('active') 
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
      this.bindEvent()
      this.bindEventhub()
      this.getAllSongs()
    },
    bindEvent(){
      $(this.view.el).on('click','li',(e)=>{
        this.view.activeItem(e.currentTarget)
        let songId = e.currentTarget.getAttribute('data-song-id')
        let songs = this.model.data.songs
        let data = []
        for(let i = 0;i<songs.length;i++){
          if(songs[i].id === songId){
            data = songs[i]
            break
          }
        }
        window.eventhub.emit('select',JSON.parse(JSON.stringify(data)))
      })
    },
    bindEventhub(){
      window.eventhub.on('upload',()=>{
        this.view.clearActive()
      })
      window.eventhub.on('create',(songData)=>{
        this.model.data.songs.push(songData)
        this.view.render(this.model.data)
      })
      window.eventhub.on('new',()=>{
        this.view.clearActive()
      })
    },
    getAllSongs(){
      return this.model.find().then(()=>{
        this.view.render(this.model.data)
      })
    }
  }
  controller.init(view,model)
}