(() => {
    const t = "https://avivphonebook.herokuapp.com/";
    document.getElementById("add").addEventListener("click", async function () {
        let t = document.getElementById("name").value,
            e = document.getElementById("number").value;
        await (async (t, e) => {
            const n = { name: t, number: e };
            return axios
                .post("https://avivphonebook.herokuapp.com/api/persons/", n)
                .then((t) => t.data);
        })(t, e),
            a();
    }),
        document
            .getElementById("list")
            .addEventListener("click", async function (e) {
                let o = e.target.childNodes[0].textContent;
                "🗑" === o
                    ? (await (async (e) => {
                          const o = await n(e),
                              a = t + "api/persons/" + o;
                          return axios.delete(a).then((t) => t.data);
                      })(e.target.parentElement.childNodes[0].textContent),
                      a())
                    : s(o);
            });
    const e = () => axios.get(t + "api/persons").then((t) => t.data);
    async function n(t) {
        let n = await e();
        for (let e of n) if (e.name === t) return e.id;
    }
    function o(t) {
        let e = i("div", ["🗑"]),
            n = i("a", [t, e], ["list-group-item", "list-group-item-action"]);
        document.getElementById("list").append(n);
    }
    function a() {
        (document.getElementById("list").innerHTML = ""),
            (async function () {
                let t = await e();
                for (let e of t) o(e.name);
            })();
    }
    async function s(e) {
        console.log(e);
        let o = await (async (e) => {
                const o = await n(e),
                    a = t + "api/persons/" + o;
                return axios.get(a).then((t) => t.data);
            })(e),
            a = i("div", [`${o.id}| ${o.name}| ${o.number}`]);
        (document.getElementById("showPerson").innerHTML = ""),
            document.getElementById("showPerson").append(a);
    }
    function i(t, e = [], n = [], o, a) {
        const s = document.createElement(t);
        for (let t of e)
            ("string" != typeof t && "number" != typeof t) ||
                (t = document.createTextNode(t)),
                s.appendChild(t);
        for (const t of n) s.classList.add(t);
        for (const t in o) s.setAttribute(t, o[t]);
        for (const t in a) s.addEventListener(t, a[t]);
        return s;
    }
    a(), s("Arto Hellas");
})();
