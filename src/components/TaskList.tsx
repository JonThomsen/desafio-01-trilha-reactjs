import { useEffect, useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    
    //const updateTasks = Array.from<Task>(tasks);
    //  if (newTaskTitle) {
    //    updateTasks.push({ id: tasks.length, title: newTaskTitle, isComplete: false });
    //    setTasks(updateTasks);
    //  }

    //se negar o texto, e der false, assim impedirá o resto da execução do código
    if (!newTaskTitle) return;

    const newTask = {
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false
    }

    //setState pode ser usado em forma de callbacks
    //em vários casos de renderização, como useEffect por exemplo,
    //ao dar o set e tentar usar o valor antigo pode estar desatualizado
    //com callback podemos pegar o valor antigo
    setTasks(oldState => [...oldState, newTask]);
    setNewTaskTitle('');
  }
 
  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    
    //se for === retornar a task editada, caso contrário a mesma
    const tasksToogleCompletion = tasks.map(task => task.id === id ? {
      ...task,
      //pegando as demais propriedades e sobrescrevendo apenas isComplete
      isComplete: !task.isComplete
    } : task)

    setTasks(tasksToogleCompletion);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    
    //const updateTasks = Array.from(tasks);
    //updateTasks.splice(id, 1);
    //setTasks(updateTasks);

    //retornar todos os outros itens menos o do id passado
    const filteredTasks = tasks.filter(task => task.id !== id);
    setTasks(filteredTasks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}