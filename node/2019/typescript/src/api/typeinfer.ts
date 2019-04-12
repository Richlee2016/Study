// 类型推导

let nice = "list";

let arr = [1, "321"];

// 上下文类型  左边 推导 右边
window.onmousedown = function(e) {
  console.log(e);
};

// 类型兼容性
interface Info {
  name: string;
}

let infos: Info;

const b = { name: "listen" };
const c = { name: 18 };
const a = { name: "listen", age: 18 };
