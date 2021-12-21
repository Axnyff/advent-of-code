const nb_elves = 3005290;
const elves = {};

const items = {
  value: 1,
};
let current = items;

for (let i = 1; i < nb_elves; i++) {
  current.next = {
    value: i +1,
  };
  current = current.next;
}
current.next = items;

current = items;
while (current.next.value !== current.next.next.value) {
  current.next = current.next.next;
  current = current.next;
}

console.log(current.value);
