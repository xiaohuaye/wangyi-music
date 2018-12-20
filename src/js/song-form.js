{
  let view = {
    el: ".page>main",
    init() {
      this.$el = $(this.el);
    },
    template: `
    <h1>新建歌曲</h1>
        <form class="form">
            <div class="row">
                <label for="">歌名<input name="name" type="text" value="__name__"></label>
            </div>
            <div class="row">
                <label for="">歌手<input name="singer" type="text" value="__singer__"></label>
            </div>
            <div class="row">
                <label for="">外链<input name="url" type="text" value="__url__"></label>
            </div>
            <div class="form-btn">
                <input type="submit" value="保存">
                <input type="reset" value="清空">
            </div>
        </form>`,
    render(data = {}) {
      let placeholders = ["name", "singer","url","id"];
      let html = this.template;
      placeholders.map(string => {
        html = html.replace(`__${string}__`, data[string] || "");
      });
      $(this.el).html(html);
    },
    reset(){
      this.render({})
    }
  };
  let model = {
    data: { name: "", singer: "", url: "", id: "" },
    create(data) {
      // 声明一个 Todo 类型
      var Song = AV.Object.extend("song");
      // 新建一个 Todo 对象
      var song = new Song();
      song.set("name", data.name);
      song.set("singer", data.singer);
      song.set("url", data.url);
      return song.save().then(
        (newSong)=>{
          // let id = newSong.id
          // let attributes = newSong.attributes
          let {id,attributes} = newSong
          // Object.assign(this.data,{
          //   id:id,
          //   name: attributes.name,
          //   singer: attributes.name,
          //   url: attributes.url
          // })
          Object.assign(this.data,{id, ...attributes})
          
        },
        (error)=>{
          // 异常处理
          console.error(
            error
          );
        }
      );
    }
  };
  let controller = {
    view: null,
    model: null,
    init(view, model) {
      this.view = view;
      this.view.init();
      this.model = model;
      this.view.render(this.model.data);
      this.bindEvent();
      window.eventhub.on("upload", data => {
        this.view.render(data);
      });
    },
    bindEvent() {
      this.view.$el.on("submit", "form", e => {
        e.preventDefault();
        let need = "name singer url".split(" ");
        let data = {};
        need.map(string => {
          data[string] = this.view.$el.find(`input[name = "${string}"]`).val();
        });
        this.model.create(data).then(()=>{
          this.view.render(this.model.data)
          this.view.reset()
        },(error)=>{console.log(error)})
      });
    }
  };
  controller.init(view, model);
}
