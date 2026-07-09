import { useState } from "react";
import { Plus, Trash2, Check } from "lucide-react";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const addTodo = () => {
    if (text.trim() === "") return;
    const newTodo = {
      id: Date.now(),
      title: text,
      done: false,
    };
    setTodos([...todos, newTodo]);
    setText("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") addTodo();
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0F1115] p-6">
      <div className="w-full max-w-md rounded-2xl bg-[#171A21] border border-white/10 shadow-2xl p-6">
        <h1 className="text-white text-lg font-semibold mb-4">Todo List</h1>

        <div className="flex gap-2 mb-5">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="নতুন কাজ লিখো..."
            className="flex-1 bg-white/5 text-white placeholder-white/30 rounded-xl px-4 py-3 outline-none border border-white/10 focus:border-emerald-400/50 transition-colors"
          />
          <button
            onClick={addTodo}
            className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-xl px-4 transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>

        {todos.length === 0 && (
          <p className="text-white/30 text-sm text-center py-6">
            কোনো কাজ নেই। উপরে লিখে যোগ করো।
          </p>
        )}

        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3"
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${
                  todo.done
                    ? "bg-emerald-500 border-emerald-500"
                    : "border-white/30"
                }`}
              >
                {todo.done && <Check size={12} className="text-white" />}
              </button>

              <span
                className={`flex-1 text-sm transition-colors ${
                  todo.done ? "text-white/30 line-through" : "text-white"
                }`}
              >
                {todo.title}
              </span>

              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-white/30 hover:text-rose-400 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}