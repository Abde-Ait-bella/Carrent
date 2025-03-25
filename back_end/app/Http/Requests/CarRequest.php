<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CarRequest extends FormRequest
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
            'brand' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'registration_number' => 'required|string|max:255|unique:cars,registration_number,' . $this->car?->id,
            'year' => 'required|integer|min:1900|max:' . date('Y'),
            'color' => 'required|string|max:255',
            'engine' => 'required|string|max:255',
            'image' => 'nullable|image',
            'quantity' => 'required|integer|min:1',
            'mileage' => 'required|integer|min:0',
            'resduce' => 'required|integer|min:0',
            'stars' => 'required|integer|min:0|max:5',
            'price_per_day' => 'required|numeric|min:0',
            'status' => 'required|in:disponible,reserve,loue,maintenance',
            'description' => 'nullable|string',
        ];
    }
}
