<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use App\Models\TodoList;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function index()
    {
        $todos = Todo::all();
        return response()->json($todos);
    }

    public function store(Request $request)
    {
        $todosWithBiggerOrder = Todo::where('todo_list_id', $request->input('todo_list_id'))->where('order', '>=', $request->input('order'))->get();

        foreach ($todosWithBiggerOrder as $todo) {
            $todo->order++;
            $todo->save();
        }

        $todo = new Todo();
        $todo->todo_list_id = $request->input('todo_list_id');
        $todo->content = $request->input('content') ?? '';
        $todo->completed = $request->input('completed');
        $todo->order = $request->input('order');
        $todo->save();

        return response()->json($todo);
    }

    public function show(int $id)
    {
        $todo = Todo::findOrFail($id);
        return response()->json($todo);
    }

    public function update(Request $request, $id)
    {
        $todo = Todo::findOrFail($id);
        $todo->update([
            'title' => $request->input('title'),
            'content' => ($request->input('content') ?? ''),
            'completed' => $request->input('completed'),
        ]);
        return response()->json($todo);
    }

    public function destroy($id)
    {
        $todo = Todo::with('todoList')->findOrFail($id);
        $todo->delete();
        if ($todo->todoList->todos->count() === 0) {
            $todo->todoList->todos()->save(new Todo([
                'content' => '',
                'completed' => false,
            ]));
        }
        return response()->json(['success' => 'Todo deleted']);
    }
}
