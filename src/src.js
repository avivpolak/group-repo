const baseUrl = `/`;

document.getElementById("add").addEventListener("click", handlePost);
document.getElementById("list").addEventListener("click", handleEventPerson);

const getAll = () => {
    const request = axios.get(baseUrl + "api/persons");
    return request.then((response) => response.data);
};

const getPerson = async (name) => {
    const id = await idFromName(name);
    const url = baseUrl + "api/persons/" + id;
    const request = axios.get(url);
    return request.then((response) => response.data);
};
const postPerson = async (name, number) => {
    const body = {
        name: name,
        number: number,
    };
    const url = baseUrl + "api/persons/";
    const request = axios.post(url, body);
    return request.then((response) => response.data);
};
const deletePerson = async (name) => {
    const id = await idFromName(name);
    const url = baseUrl + "api/persons/" + id;
    const request = axios.delete(url);
    return request.then((response) => response.data);
};
async function handleEventPerson(event) {
    let name = event.target.childNodes[0].textContent;
    if (name === "🗑") {
        await deletePerson(
            event.target.parentElement.childNodes[0].textContent
        );
        render();
    } else {
        showPerson(name);
    }
}
async function idFromName(name) {
    let list = await getAll();
    for (let person of list) {
        if (person.name === name) {
            return person.id;
        }
    }
}

async function handlePost() {
    let name = document.getElementById("name").value;
    let number = document.getElementById("number").value;
    let response = await postPerson(name, number);
    render();
}

function addTolist(name) {
    let trash = createElement("div", ["🗑"]);
    let elem = createElement(
        "a",
        [name, trash],
        ["list-group-item", "list-group-item-action"]
    );
    document.getElementById("list").append(elem);
}
function render() {
    document.getElementById("list").innerHTML = "";
    showAll();
}

render();
showPerson("Arto Hellas");
async function showPerson(name) {
    console.log(name);
    let person = await getPerson(name);
    let elem = createElement("div", [
        `${person.id}| ${person.name}| ${person.number}`,
    ]);
    document.getElementById("showPerson").innerHTML = "";
    document.getElementById("showPerson").append(elem);
}

async function showAll() {
    let list = await getAll();
    for (let person of list) {
        addTolist(person.name);
    }
}

function createElement(
    tagname,
    children = [],
    classes = [],
    attributes,
    events
) {
    //the most generic element builder.
    //we will build all the elements here.

    const el = document.createElement(tagname);

    //children

    for (let child of children) {
        if (typeof child === "string" || typeof child === "number") {
            child = document.createTextNode(child);
        }
        el.appendChild(child);
    }

    //classes

    for (const cls of classes) {
        el.classList.add(cls);
    }

    //attrubutes

    for (const attr in attributes) {
        el.setAttribute(attr, attributes[attr]);
    }

    //attrubutes

    for (const event in events) {
        el.addEventListener(event, events[event]);
    }

    return el;
}
