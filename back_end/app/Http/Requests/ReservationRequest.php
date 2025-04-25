<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReservationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *  
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'car_id' => 'required|exists:cars,id',
            'rental_start' => 'required|date',
            'rental_end' => 'required|date|after:rental_start',
            'daily_rate' => 'required|numeric|min:0',
            // 'total_price' => 'required|numeric|min:0',
            'state' => 'required|in:pending,confirmed,canceled,completed',
            'user_phone' => 'nullable',
        ];
    }
}
