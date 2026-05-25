import { useState } from 'react';
import {
  Trash2,
  CheckCircle2,
  Circle,
  Plus,
  Pencil,
  Check,
} from 'lucide-react';
import { useLng } from '../context/LanguageContext';

export function Tasks() {
  const { t, searchQuery, tasks, setTasks } = useLng();
  const [editingId, setEditingId] = useState(null);

  const addTask = () => {
    const newTask = {
      id: Date.now(),
      title: t('defaultTaskTitle'),
      description: t('defaultTaskDesc'),
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setEditingId(newTask.id);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const updateTask = (id, field, value) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, [field]: value } : task))
    );
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesTitle = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesDesc = task.description
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesTitle || matchesDesc;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black mb-2">{t('tasks')}</h1>
          <p className="text-gray-400">{t('taskManagement')}</p>
        </div>

        <button
          onClick={addTask}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-violet-600 hover:bg-violet-500 transition-all"
        >
          <Plus size={20} />
          {t('newTask')}
        </button>
      </div>

      <div className="grid gap-4">
        {filteredTasks.map((task) => {
          const isEditing = editingId === task.id;

          return (
            <div
              key={task.id}
              className="bg-white/5 border border-white/10 rounded-3xl p-6"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex gap-4 flex-1">
                  <button onClick={() => toggleTask(task.id)}>
                    {task.completed ? (
                      <CheckCircle2 className="text-green-400" size={26} />
                    ) : (
                      <Circle className="text-gray-500" size={26} />
                    )}
                  </button>

                  <div className="flex-1">
                    {isEditing ? (
                      <>
                        <input
                          value={task.title}
                          onChange={(e) =>
                            updateTask(task.id, 'title', e.target.value)
                          }
                          className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 mb-3 outline-none focus:border-violet-500 transition-all text-white"
                        />
                        <textarea
                          value={task.description}
                          onChange={(e) =>
                            updateTask(task.id, 'description', e.target.value)
                          }
                          className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-violet-500 transition-all text-white resize-none"
                          rows={2}
                        />
                      </>
                    ) : (
                      <>
                        <h2
                          className={`text-2xl font-bold ${
                            task.completed ? 'line-through text-gray-500' : ''
                          }`}
                        >
                          {task.title}
                        </h2>
                        <p className="text-gray-400 mt-2">{task.description}</p>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingId(isEditing ? null : task.id)}
                    className={`p-3 rounded-xl transition-all ${
                      isEditing
                        ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                        : 'hover:bg-white/10 text-gray-400 hover:text-white'
                    }`}
                    title={isEditing ? t('save') : t('edit')}
                  >
                    {isEditing ? <Check size={20} /> : <Pencil size={20} />}
                  </button>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-3 rounded-xl hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-all"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filteredTasks.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            Нічого не знайдено за вашим запитом 🔍
          </p>
        )}
      </div>
    </div>
  );
}
