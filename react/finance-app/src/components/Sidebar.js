export default function Sidebar() {
  return (
    <div class="border-end bg-white" id="sidebar-wrapper">
      <div class="sidebar-heading border-bottom bg-light">Budget App</div>
      <div class="list-group list-group-flush">
        <a
          class="list-group-item list-group-item-action list-group-item-light p-3"
          href="/home"
        >
          Home
        </a>
        <a
          class="list-group-item list-group-item-action list-group-item-light p-3"
          href="/transactions"
        >
          Transactions
        </a>
        <a
          class="list-group-item list-group-item-action list-group-item-light p-3"
          href="/budgets"
        >
          Budgets
        </a>
        <a
          class="list-group-item list-group-item-action list-group-item-light p-3"
          href="/budget_categories"
        >
          Budget Categories
        </a>
        <a
          class="list-group-item list-group-item-action list-group-item-light p-3"
          href="/graphs"
        >
          Graphs
        </a>
      </div>
    </div>
  );
}
