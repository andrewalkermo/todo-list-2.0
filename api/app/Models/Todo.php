<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\TodoList
 *
 * @property int $id
 * @property int $todo_list_id
 * @property string $content
 * @property int $order
 * @property bool $completed
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\TodoList $todoList
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\TodoList newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\TodoList newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\TodoList query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\TodoList whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\TodoList whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\TodoList whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\TodoList whereUpdatedAt($value)
 */
class Todo extends Model
{
    use HasFactory;

    protected $fillable = [
        'content',
        'completed',
    ];

    protected $casts = [
        'completed' => 'boolean',
    ];

    public function todoList(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(TodoList::class);
    }

    public function complete()
    {
        $this->completed = true;
        $this->save();
    }

    public function incomplete()
    {
        $this->completed = false;
        $this->save();
    }

}
