<?php

namespace Modules\Ticket\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\BaseResource;

class MessageResource extends BaseResource
{
  protected $showSensitiveAttributes = true;
  public static $wrap = null;

  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array
  {
    return [
      'id' => $this->id,
      'message' => $this->message,
      'media' => $this->media?->pluck('original_url')?->toArray(),
    ];
  }
}
