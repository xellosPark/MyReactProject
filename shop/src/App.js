import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

// 콤포넌트는 항상 대문자 시작 
function Item(props) {
  return (
    <div class="card">
      <img src={props.url} class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">{props.name}</h5>
        <p class="card-text">{props.price} <br></br> Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" class="btn btn-primary">구매하기</a>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
      <Item name="iphone 12" price="100만원"
      url = "https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi.pinimg.com%2F736x%2Fe3%2F2a%2F97%2Fe32a97067dfb1496d0e1dd6ba0a8b022.jpg&type=a340"/>
      <Item name="iphone SE" price="100만원"
      url = "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA3MDlfMjIz%2FMDAxNjg4ODkyMjA2Mjk4.FjlGBmoCj6R6Q4uRFBnN5LMLnJQFsCnpWIZh4pulSmsg.m2Fgh2q-YC4bXJhqJyFDehkkObiFfMNNeetAt8wo_hUg.PNG.kiheung_neptune%2Fgw8f575k.png&type=a340"/>       
      <Item name="iphone 7" price="100만원"
      url = "https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi.ebayimg.com%2Fimages%2Fg%2F3R0AAOSwHoplZldY%2Fs-l1600.png&type=a340"/>
      <Item name="iphone 13" price="100만원"
      url = "https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi.pinimg.com%2F736x%2Ff7%2Fd8%2F42%2Ff7d842182e6196b0f4294377e462723d.jpg&type=a340"/>
      <Item name="iphone 6s" price="100만원"
      url = "https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi.pinimg.com%2F736x%2F77%2F54%2Fea%2F7754ea5c7dbf729c1809499995c2497a.jpg&type=a340"/>
      <Item name="iphone XR" price="100만원"
      url = "https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi.pinimg.com%2F736x%2F76%2Fc3%2F1d%2F76c31dd84ea10994f467571304a01cd8.jpg&type=a340"/>
    </div>
  );
}

export default App;
