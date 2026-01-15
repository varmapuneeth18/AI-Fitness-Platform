"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Camera } from "lucide-react"

export interface AnalysisResult {
    detected_items?: Array<{
        name: string;
        calories_per_100g: number;
        protein_per_100g: number;
        carbs_per_100g: number;
        fat_per_100g: number;
        estimated_weight_g: number;
    }>;
    message?: string;
}

export default function ImageUpload({ onAnalysis }: { onAnalysis: (data: AnalysisResult) => void }) {
    const [uploading, setUploading] = useState(false)

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return
        const file = e.target.files[0]

        setUploading(true)
        const formData = new FormData()
        formData.append("file", file)

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001"
            const res = await fetch(`${apiUrl}/nutrition/analyze-image`, {
                method: "POST",
                body: formData
            })
            if (res.ok) {
                const data = await res.json()
                onAnalysis(data)
            }
        } catch (e) {
            console.error(e)
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="flex items-center gap-2">
            <Input
                type="file"
                accept="image/*"
                className="hidden"
                id="food-image-upload"
                onChange={handleUpload}
            />
            <Button variant="outline" onClick={() => document.getElementById("food-image-upload")?.click()} disabled={uploading}>
                <Camera className="mr-2 h-4 w-4" />
                {uploading ? "Analyzing..." : "Scan Food"}
            </Button>
        </div>
    )
}
