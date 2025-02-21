import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import { Checkbox } from '../components/ui/checkbox';
import { X } from 'lucide-react';
import { cn } from "../lib/utils";

interface Task {
  id: string;
  task: string;
  action: string;
  timeAgo?: string;
  completed?: boolean;
  originalCategory?: string;
}

interface TaskCategory {
  id: string;
  title: string;
  tasks: Task[];
}

export default function YourTasks() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<TaskCategory[]>([
    {
      id: 'campaign',
      title: 'Campaign',
      tasks: [
        { 
          id: 'task-1', 
          task: 'Max (Shopify) asked to discuss HCRI pricing',
          action: 'schedule meeting / send quote',
          timeAgo: '1 day ago'
        },
        { 
          id: 'task-2', 
          task: 'Dylan (Nike) responded that they stopped using autopay because they had invoicing issues',
          action: 'send tutorial/email AM',
          timeAgo: '14 hrs ago'
        }
      ]
    },
    {
      id: 'insights',
      title: 'Insights',
      tasks: [
        { 
          id: 'task-3', 
          task: '17 customers churned because Deel didn’t support crypto payments. Now we do!',
          action: 'email them and offer to join our platform',
          timeAgo: '5 days ago'
        },
        { 
          id: 'task-4', 
          task: '35% increase with tickets from accounts / payments in Brazil',
          action: 'reach out to support / product',
          timeAgo: '23 hrs ago'
        }
      ]
    },
    {
      id: 'Blind Spots',
      title: 'Blind Spots',
      tasks: [
        { 
          id: 'task-5', 
          task: 'Rob (H&M) waiting to hear about product roadmap',
          action: 'email based on the recent product update',
          timeAgo: '3 days ago'
        },
        { 
          id: 'task-6', 
          task: 'Rebecca (Nike CFO’s office) emailed about a ticket',
          action: 'reply now',
          timeAgo: '3 days ago'
        },
        { 
          id: 'task-7', 
          task: 'John (Reuters) emailed about an invoicing ticket',
          action: 'email support',
          timeAgo: '3 days ago'
        }
      ]
    },
    {
      id: 'completed',
      title: 'Completed',
      tasks: []
    }
  ]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      // Reordering within the same category
      const category = categories.find(cat => cat.id === source.droppableId);
      if (!category) return;

      const newTasks = Array.from(category.tasks);
      const [removed] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, removed);

      setCategories(categories.map(cat =>
        cat.id === source.droppableId ? { ...cat, tasks: newTasks } : cat
      ));
    } else {
      // Moving between categories
      const sourceCategory = categories.find(cat => cat.id === source.droppableId);
      const destCategory = categories.find(cat => cat.id === destination.droppableId);
      if (!sourceCategory || !destCategory) return;

      const sourceTasks = Array.from(sourceCategory.tasks);
      const destTasks = Array.from(destCategory.tasks);
      const [removed] = sourceTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, removed);

      setCategories(categories.map(cat => {
        if (cat.id === source.droppableId) return { ...cat, tasks: sourceTasks };
        if (cat.id === destination.droppableId) return { ...cat, tasks: destTasks };
        return cat;
      }));
    }
  };

  const handleDeleteTask = (categoryId: string, taskId: string) => {
    setCategories(categories.map(category =>
      category.id === categoryId
        ? { ...category, tasks: category.tasks.filter(task => task.id !== taskId) }
        : category
    ));
  };

  const handleCheckTask = (categoryId: string, taskId: string, checked: boolean) => {
    const sourceCategory = categories.find(cat => cat.id === categoryId);
    const completedCategory = categories.find(cat => cat.id === 'completed');
    if (!sourceCategory || !completedCategory) return;

    const task = sourceCategory.tasks.find(t => t.id === taskId);
    if (!task) return;

    if (checked) {
      // Move to completed
      const updatedSourceTasks = sourceCategory.tasks.filter(t => t.id !== taskId);
      const updatedCompletedTasks = [...completedCategory.tasks, { 
        ...task, 
        completed: true,
        originalCategory: categoryId 
      }];

      setCategories(categories.map(cat => {
        if (cat.id === categoryId) return { ...cat, tasks: updatedSourceTasks };
        if (cat.id === 'completed') return { ...cat, tasks: updatedCompletedTasks };
        return cat;
      }));
    } else {
      // Move back to original category
      const originalCategoryId = task.originalCategory || categoryId;
      const originalCategory = categories.find(cat => cat.id === originalCategoryId);
      if (!originalCategory) return;

      const updatedCompletedTasks = completedCategory.tasks.filter(t => t.id !== taskId);
      const updatedOriginalTasks = [...originalCategory.tasks, { 
        ...task, 
        completed: false,
        originalCategory: undefined 
      }];

      setCategories(categories.map(cat => {
        if (cat.id === 'completed') return { ...cat, tasks: updatedCompletedTasks };
        if (cat.id === originalCategoryId) return { ...cat, tasks: updatedOriginalTasks };
        return cat;
      }));
    }
  };

  return (
    <div className="bg-gray-500 w-[800px] h-[600px] p-1">
      <div className="flex flex-col border border-gray-500 rounded-xl p-4 bg-black shadow-sm h-full">
        {/* Header */}
        <div className="flex items-center flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-white mr-2"/>
          <h1 className="text-3xl font-bold text-white">Kai AI</h1>
        </div>

        {/* Subheader */}
        <div className="flex-shrink-0">
          <h1 className="text-xl mt-4 text-white">Your Tasks</h1>
          <h2 className="text-sm text-gray-400">Check to complete, drag to reorder</h2>
        </div>

        {/* Task Categories */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="border border-gray-500 rounded-lg p-4 my-4 space-y-4 flex-1 overflow-y-auto">
            {categories.map(category => (
              <div key={category.id} className="rounded-lg">
                <h3 className="text-lg font-medium text-white mb-3">{category.title}</h3>
                <Droppable droppableId={category.id}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-2"
                    >
                      {category.tasks.map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-white rounded-lg p-3 flex items-start group"
                            >
                              {(category.id !== 'completed' || task.completed) && (
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id={task.id}
                                    checked={task.completed}
                                    className="mt-0.5"
                                    onCheckedChange={(checked: boolean | "indeterminate") => 
                                      handleCheckTask(category.id, task.id, checked === true)
                                    }
                                  />
                                </div>
                              )}
                              <div className="flex-1 ml-2">
                                <p className={cn(
                                  "text-sm",
                                  task.completed ? "text-gray-400 line-through" : "text-black"
                                )}>
                                  {task.task}
                                  {task.action && (
                                    <>
                                      <span className="text-gray-400"> → </span>
                                      <button
                                        onClick={() => navigate("/")}
                                        className="text-blue-600 hover:text-blue-800 underline focus:outline-none"
                                      >
                                        {task.action}
                                      </button>
                                    </>
                                  )}
                                </p>
                                {task.timeAgo && (
                                  <p className="text-gray-400 text-xs mt-1">{task.timeAgo}</p>
                                )}
                              </div>
                              <button
                                onClick={() => handleDeleteTask(category.id, task.id)}
                                className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>

        <div className="flex items-center">
          <button 
            onClick={() => navigate('/')}
            className="text-white hover:text-gray-500"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}
