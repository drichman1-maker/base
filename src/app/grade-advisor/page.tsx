
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, Upload, Calculator, TrendingUp, TrendingDown } from "lucide-react"

export default function GradeAdvisorPage() {
    const [step, setStep] = useState(1)
    const [analyzing, setAnalyzing] = useState(false)
    const [result, setResult] = useState<any>(null)

    const handleAnalyze = () => {
        setAnalyzing(true)
        // Mock analysis delay
        setTimeout(() => {
            setAnalyzing(false)
            setStep(3)
            // Mock result
            setResult({
                recommendation: "GRADE IT",
                confidence: 85,
                expectedGrade: "9-10",
                rawPrice: 1500,
                gradedPrice: 4500,
                gradingCost: 50,
                roi: 196
            })
        }, 2000)
    }

    return (
        <div className="container max-w-3xl py-12 space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">AI Grade Advisor</h1>
                <p className="text-xl text-muted-foreground">
                    Upload your card. We'll analyze the condition and market data to tell you if it's worth grading.
                </p>
            </div>

            {step === 1 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Step 1: Identify Card</CardTitle>
                        <CardDescription>Search our database for the card you want to grade.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="e.g. 1952 Topps Mickey Mantle" className="pl-9" />
                        </div>
                        <div className="border-2 border-dashed rounded-lg p-12 flex flex-col items-center justify-center text-center space-y-2 hover:bg-muted/50 transition-colors cursor-pointer">
                            <Upload className="h-8 w-8 text-muted-foreground" />
                            <span className="font-medium">Upload Front & Back Photos</span>
                            <span className="text-xs text-muted-foreground">AI analysis requires high-res images</span>
                        </div>
                        <Button className="w-full" size="lg" onClick={() => setStep(2)}>
                            Next: Condition Check
                        </Button>
                    </CardContent>
                </Card>
            )}

            {step === 2 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Step 2: Condition Pre-Screen</CardTitle>
                        <CardDescription>Reviewing corners, edges, centering, and surface.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Centering</span>
                                    <span className="font-mono text-green-500">Detecting...</span>
                                </div>
                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-primary animate-pulse w-2/3"></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Corners</span>
                                    <span className="font-mono text-muted-foreground">Pending</span>
                                </div>
                                <div className="h-2 bg-muted rounded-full"></div>
                            </div>
                        </div>

                        <Button className="w-full" size="lg" onClick={handleAnalyze} disabled={analyzing}>
                            {analyzing ? "Running ROI Simulation..." : "Calculate Profitability"}
                        </Button>
                    </CardContent>
                </Card>
            )}

            {step === 3 && result && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <Card className="border-green-500/50 bg-green-500/5 overflow-hidden">
                        <CardHeader className="text-center pb-2">
                            <div className="mx-auto bg-green-500 text-white px-4 py-1 rounded-full text-xs font-bold mb-4 w-fit">
                                VERDICT: {result.recommendation}
                            </div>
                            <CardTitle className="text-3xl text-green-600">
                                +{result.roi}% ROI Projected
                            </CardTitle>
                            <CardDescription>
                                Based on estimated grade {result.expectedGrade}
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Estimated Value (Graded)</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">${result.gradedPrice.toLocaleString()}</div>
                                <p className="text-xs text-muted-foreground">PSA 10 Comparable</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Current Value (Raw)</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">${result.rawPrice.toLocaleString()}</div>
                                <p className="text-xs text-muted-foreground">Ungraded Average</p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Grading Strategy</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 p-2 rounded-lg">
                                    <TrendingUp className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-bold">Submit to PSA ($50)</h4>
                                    <p className="text-sm text-muted-foreground">Highest resale liquidity. Current turnaround 45 days.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 opacity-70">
                                <div className="bg-muted p-2 rounded-lg">
                                    <Calculator className="h-5 w-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold">Submit to SGC ($25)</h4>
                                    <p className="text-sm text-muted-foreground">Faster (5-10 days), but strictly lower ROI on this specific card.</p>
                                </div>
                            </div>
                            <Button className="w-full mt-4" onClick={() => window.location.reload()}>Analyze Another Card</Button>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    )
}
