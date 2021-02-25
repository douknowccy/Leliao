
export const compare = (p: string) => { //这是比较函数
 return function (m: any, n: any) {
  let t1 = new Date(Date.parse(m.date.replace(/-/g, "/")))
  let t2 = new Date(Date.parse(n.date.replace(/-/g, "/")))
  return t2.getTime() - t1.getTime()

 }
}