
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck, Award, Trophy, Star, ExternalLink, Unlock, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import SkillQuiz from '@/components/SkillQuiz';
import { toast } from '@/hooks/use-toast';

// Badge tiers and data
const skillBadges = {
  bronze: [
    { id: 'front-end-basic', name: 'Front-end Engineer Basic', status: 'active', icon: <BadgeCheck className="h-8 w-8" />, color: 'bg-[#CD7F32]' },
    { id: 'ux-ui-basic', name: 'UX/UI Designer Basic', status: 'inactive', icon: <BadgeCheck className="h-8 w-8" />, color: 'bg-[#CD7F32]' },
    { id: 'back-end', name: 'Back-end Engineer', status: 'inactive', icon: <BadgeCheck className="h-8 w-8" />, color: 'bg-[#CD7F32]' },
    { id: 'web3', name: 'Web3 Engineer', status: 'inactive', icon: <BadgeCheck className="h-8 w-8" />, color: 'bg-[#CD7F32]' },
  ],
  silver: [
    { id: 'smart-contract', name: 'Smart Contract Engineer (EVM)', status: 'inactive', icon: <Award className="h-8 w-8" />, color: 'bg-[#C0C0C0]' },
    { id: 'red-hat', name: 'Basic Red-hat Hacker', status: 'inactive', icon: <Award className="h-8 w-8" />, color: 'bg-[#C0C0C0]' },
    { id: 'aws', name: 'AWS Solution Associate', status: 'inactive', icon: <Award className="h-8 w-8" />, color: 'bg-[#C0C0C0]' },
    { id: 'project-mgmt', name: 'Project Management', status: 'inactive', icon: <Award className="h-8 w-8" />, color: 'bg-[#C0C0C0]' },
  ],
  gold: [
    { id: 'solana', name: 'Solana Engineer', status: 'inactive', icon: <Trophy className="h-8 w-8" />, color: 'bg-[#FFD700]' },
    { id: 'aptos', name: 'Aptos Engineer', status: 'inactive', icon: <Trophy className="h-8 w-8" />, color: 'bg-[#FFD700]' },
    { id: 'layer-zero', name: 'Layer-Zero Engineer', status: 'inactive', icon: <Trophy className="h-8 w-8" />, color: 'bg-[#FFD700]' },
  ]
};

const SkillTracks: React.FC = () => {
  const [selectedBadge, setSelectedBadge] = useState<any>(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isPracticalOpen, setIsPracticalOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);

  const handleBadgeClick = (badge: any) => {
    setSelectedBadge(badge);
  };

  const handleUnlock = () => {
    setIsQuizOpen(true);
  };

  const handleQuizComplete = (score: number) => {
    const passScore = 85;
    if (score >= passScore) {
      setQuizPassed(true);
      setIsQuizOpen(false);
      setIsPracticalOpen(true);
      toast({
        title: "Quiz Passed!",
        description: `You scored ${score}%. You can now proceed to the practical exam.`,
      });
    } else {
      setIsQuizOpen(false);
      toast({
        title: "Quiz Failed",
        description: `You scored ${score}%. You need 85% or higher to pass.`,
        variant: "destructive",
      });
    }
  };

  const handlePracticalRequest = () => {
    setIsPracticalOpen(false);
    setIsSuccessOpen(true);
  };

  const handleSuccessClose = () => {
    setIsSuccessOpen(false);
    // Update badge status to active
    if (selectedBadge) {
      const updatedBadge = { ...selectedBadge, status: 'active' };
      toast({
        title: "Badge Unlocked!",
        description: `Congratulations! You've earned the ${selectedBadge.name} badge.`,
      });
    }
  };

  // Badge style variants based on status
  const getBadgeStyles = (badge: any) => {
    const baseStyles = `rounded-xl p-5 ${badge.status === 'active' ? 'border-2 border-[#3D88CF]' : 'border border-gray-200'} transition-all duration-300 hover:shadow-md cursor-pointer`;
    const statusStyles = badge.status === 'active' ? 'bg-white shadow-md' : 'bg-gray-50';
    return `${baseStyles} ${statusStyles}`;
  };

  return (
    <div className="space-y-12">
      {/* Bronze Tier */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-[#CD7F32] w-10 h-10 rounded-full flex items-center justify-center">
            <BadgeCheck className="text-white h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold text-[#1A2B6B]">Bronze Tier</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillBadges.bronze.map((badge) => (
            <motion.div
              key={badge.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={getBadgeStyles(badge)}
              onClick={() => handleBadgeClick(badge)}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`${badge.color} rounded-full p-3 text-white mb-4`}>
                  {badge.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2 text-[#1A2B6B]">{badge.name}</h3>
                <Badge variant={badge.status === 'active' ? 'default' : 'outline'} className={badge.status === 'active' ? 'bg-[#3D88CF]' : ''}>
                  {badge.status === 'active' ? 'Achieved' : 'Locked'}
                </Badge>
                {badge.status === 'inactive' && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-4 w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUnlock();
                    }}
                  >
                    <Unlock className="w-4 h-4 mr-2" /> Unlock
                  </Button>
                )}
                {badge.status === 'active' && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-4 w-full"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" /> View Certificate
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Silver Tier */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-[#C0C0C0] w-10 h-10 rounded-full flex items-center justify-center">
            <Award className="text-white h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold text-[#1A2B6B]">Silver Tier</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillBadges.silver.map((badge) => (
            <motion.div
              key={badge.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={getBadgeStyles(badge)}
              onClick={() => handleBadgeClick(badge)}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`${badge.color} rounded-full p-3 text-white mb-4`}>
                  {badge.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2 text-[#1A2B6B]">{badge.name}</h3>
                <Badge variant={badge.status === 'active' ? 'default' : 'outline'} className={badge.status === 'active' ? 'bg-[#3D88CF]' : ''}>
                  {badge.status === 'active' ? 'Achieved' : 'Locked'}
                </Badge>
                {badge.status === 'inactive' && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-4 w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUnlock();
                    }}
                  >
                    <Unlock className="w-4 h-4 mr-2" /> Unlock
                  </Button>
                )}
                {badge.status === 'active' && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-4 w-full"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" /> View Certificate
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Gold Tier */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-[#FFD700] w-10 h-10 rounded-full flex items-center justify-center">
            <Trophy className="text-white h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold text-[#1A2B6B]">Gold Tier</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {skillBadges.gold.map((badge) => (
            <motion.div
              key={badge.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={getBadgeStyles(badge)}
              onClick={() => handleBadgeClick(badge)}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`${badge.color} rounded-full p-3 text-white mb-4`}>
                  {badge.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2 text-[#1A2B6B]">{badge.name}</h3>
                <Badge variant={badge.status === 'active' ? 'default' : 'outline'} className={badge.status === 'active' ? 'bg-[#3D88CF]' : ''}>
                  {badge.status === 'active' ? 'Achieved' : 'Locked'}
                </Badge>
                {badge.status === 'inactive' && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-4 w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUnlock();
                    }}
                  >
                    <Unlock className="w-4 h-4 mr-2" /> Unlock
                  </Button>
                )}
                {badge.status === 'active' && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-4 w-full"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" /> View Certificate
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quiz Dialog */}
      {selectedBadge && (
        <Dialog open={isQuizOpen} onOpenChange={setIsQuizOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedBadge.name} Quiz</DialogTitle>
              <DialogDescription>
                Answer 50 questions. You need 85% correct answers to pass.
              </DialogDescription>
            </DialogHeader>
            <SkillQuiz onComplete={handleQuizComplete} />
          </DialogContent>
        </Dialog>
      )}

      {/* Practical Exam Dialog */}
      {selectedBadge && (
        <Dialog open={isPracticalOpen} onOpenChange={setIsPracticalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Practical Exam</DialogTitle>
              <DialogDescription>
                Congratulations on passing the quiz! To earn the {selectedBadge.name} badge, you need to complete a practical exam.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h3 className="font-semibold flex items-center text-blue-700 mb-2">
                  <AlertCircle className="h-5 w-5 mr-2" /> What to expect
                </h3>
                <p className="text-blue-600 text-sm">
                  The practical exam will test your skills in a real-world scenario. You'll have up to 7 days to complete the assignment.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Exam details:</h3>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>You'll receive the assignment via email</li>
                  <li>Complete the project following the requirements</li>
                  <li>Submit your work for review</li>
                  <li>Receive feedback and badge upon approval</li>
                </ul>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsPracticalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handlePracticalRequest}>
                Request Practical Exam
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Success Dialog */}
      <AlertDialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Request Submitted Successfully!</AlertDialogTitle>
            <AlertDialogDescription>
              Your practical exam request has been received. Check your email for instructions on how to proceed with the {selectedBadge?.name} practical exam.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleSuccessClose}>
              Got it!
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SkillTracks;
